"""Build launch_queue.csv: the 38 items the /seo-blog skill writes in one run (22 new posts, 16 refreshes).

    python docs/seo/keyword-map/build_launch_queue.py

Reads blog_backlog.csv and applies the decisions in docs/seo/blog-program-plan.md:
vendor posts removed, wrong-meaning searches dropped, cluster, format, CTA and product link per item.
Existing status values are kept when the file is rebuilt.
"""
from pathlib import Path

import pandas as pd

HERE = Path(__file__).resolve().parent
LAUNCH_DATE = "2026-10-26T09:00:00"

PILLAR = {
    "cold-calling": ("real-estate-cold-calling-guide", "cold-calling"),
    "conversation-skills": ("how-to-talk-to-real-estate-leads", "conversation-skills"),
    "appointment-setting": ("how-to-book-appointments-real-estate", "appointment-setting"),
    "follow-up": ("real-estate-follow-up-scripts", "follow-up"),
    "objection-handling": ("real-estate-objection-handling", "cold-calling"),
    "coaching": ("real-estate-coaching-programs", "coaching-and-tools"),
}
PRODUCT = {
    "playbook": "/products/playbook/", "cue": "/products/cue/", "pulse": "/products/pulse/",
    "smart-capture": "/products/smart-capture/", "why": "/why-sayso/", "team": "/for/team-leaders/",
}
REMOVED = {5, 7, 11, 13, 17, 21, 40}            # other companies' products (plan section 5)
DROP_SEARCHES = {                               # wrong-meaning searches found in the outside review
    16: {"agent appointment"},
    26: {"what does isa stand for"},
    41: {"real estate portal script"},
    45: {"sphere of influence script"},
}
MAIN_OVERRIDE = {16: "real estate appointment setting", 26: "isa real estate"}

# post_id: (format, cluster, ctaVariant, in-context product, persona page)
NEW = {
    1: ("comparison", "coaching", "coaching", "why", "/for/team-leaders/"),
    3: ("explainer", "coaching", "coaching", "why", "/for/new-agents/"),
    25: ("cost", "coaching", "coaching", "why", "/for/solo-agents/"),
    39: ("howto", "coaching", "team", "team", "/for/team-leaders/"),
    9: ("script", "conversation-skills", "script", "playbook", "/for/new-agents/"),
    15: ("script", "cold-calling", "script", "playbook", "/for/solo-agents/"),
    27: ("script", "conversation-skills", "script", "cue", "/for/solo-agents/"),
    31: ("script", "cold-calling", "script", "playbook", "/for/solo-agents/"),
    33: ("script", "cold-calling", "script", "playbook", "/for/new-agents/"),
    42: ("script", "conversation-skills", "script", "cue", "/for/solo-agents/"),
    44: ("script", "cold-calling", "script", "playbook", "/for/solo-agents/"),
    45: ("script", "follow-up", "script", "smart-capture", "/for/solo-agents/"),
    46: ("script", "objection-handling", "script", "cue", "/for/solo-agents/"),
    19: ("howto", "appointment-setting", "leads", "cue", "/for/solo-agents/"),
    23: ("howto", "appointment-setting", "leads", "pulse", "/for/solo-agents/"),
    34: ("script", "conversation-skills", "leads", "cue", "/for/new-agents/"),
    38: ("howto", "cold-calling", "prospecting", "playbook", "/for/solo-agents/"),
    41: ("howto", "conversation-skills", "leads", "smart-capture", "/for/isas/"),
    29: ("howto", "cold-calling", "prospecting", "cue", "/for/solo-agents/"),
    36: ("explainer", "cold-calling", "prospecting", "cue", "/for/solo-agents/"),
    37: ("howto", "cold-calling", "prospecting", "cue", "/for/solo-agents/"),
    43: ("howto", "cold-calling", "prospecting", "cue", "/for/new-agents/"),
    35: ("explainer", "coaching", "prospecting", "cue", "/for/solo-agents/"),
}
REFRESH_CLUSTER = {2: "cold-calling", 4: "conversation-skills", 6: "cold-calling", 8: "cold-calling", 10: "appointment-setting",
                   12: "cold-calling", 14: "cold-calling", 16: "appointment-setting", 18: "follow-up", 20: "cold-calling",
                   22: "objection-handling", 24: "appointment-setting", 26: "conversation-skills", 28: "conversation-skills",
                   30: "follow-up", 32: "coaching"}
TITLE_OVERRIDE = {35: "Types of real estate prospecting tools (no company names)",
                  37: "Cold calling services and VAs vs making calls yourself (no company names)",
                  29: "Real estate prospecting: strategies that work"}

b = pd.read_csv(HERE / "blog_backlog.csv")
rows = []
for _, r in b.iterrows():
    pid = int(r.post_id)
    if pid in REMOVED or r.kind == "Monitor":
        continue
    searches = [x for x in str(r.searches).split(" | ") if x and x not in DROP_SEARCHES.get(pid, set())]
    main = MAIN_OVERRIDE.get(pid, r.main_search)
    if r.kind == "New post":
        fmt, cluster, cta, product, persona = NEW[pid]
        kind = "new"
    else:
        fmt, cluster, cta, product, persona = "refresh", REFRESH_CLUSTER[pid], "", "", ""
        kind = "refresh"
    pillar, category = PILLAR[cluster]
    slug = r.sayso_url.strip("/").split("/")[-1]
    rows.append(dict(
        post_id=pid, kind=kind, title=TITLE_OVERRIDE.get(pid, r.title), url=r.sayso_url, slug=slug,
        file=f"content/blog/{slug}.mdx" if r.sayso_url.startswith("/blog/") else r.sayso_url,
        main_search=main, main_volume=r.main_volume, main_difficulty=r.main_difficulty, main_page_one=r.main_page_one,
        searches_total=r.searches_total, searches=" | ".join(searches), format=fmt, cluster=cluster,
        pillar=pillar if pillar != slug else "", category=category, cta_variant=cta,
        product_link=PRODUCT.get(product, ""), persona_link=persona, angle=r.angle,
        sayso_impr_90d=r.sayso_impr_90d, sayso_position_90d=r.sayso_position_90d,
        launch_date=LAUNCH_DATE, status="drafted" if pid == 1 else "not started",
    ))
q = pd.DataFrame(rows).sort_values(["kind", "post_id"])
out = HERE / "launch_queue.csv"
if out.exists():
    old = pd.read_csv(out).set_index("post_id")["status"]
    q["status"] = [old.get(p, s) for p, s in zip(q.post_id, q.status)]
q.to_csv(out, index=False)
print("wrote", out, "|", q.kind.value_counts().to_dict())
