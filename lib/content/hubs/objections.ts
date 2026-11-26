import type { HubPageConfig } from './types';

const objectionsHub: HubPageConfig = {
  slug: 'objections',
  section: 'Objections',
  basePath: '/objections',
  seoTitle: 'Real Estate Objection Handling Scripts & Examples',
  seoDescription:
    'Scripts and response frameworks for every common real estate objection, "not ready yet," "already have an agent," "call me later," and more.',
  h1: 'Real Estate Objection Library',
  introduction:
    'Practical response scripts for common objections real estate agents hear on prospecting calls. Each page explains what the concern may mean, how to respond without arguing, and which follow-up question can keep the conversation useful.',
  quickAnswers: {
    heading: 'Common Real Estate Objections and a One-Line Answer to Each',
    intro:
      'Each line below is the short version of the response on that objection\'s page. Open a page for the full scripts, the reasoning behind them, and what to say next.',
    items: [
      {
        slug: 'not-ready-yet',
        phrase: '"I\'m not ready yet."',
        answer: 'Agree without pushing, then ask whether they mean not ready this month or not ready this year.',
      },
      {
        slug: 'already-have-an-agent',
        phrase: '"I already have an agent."',
        answer: 'Respect it, then ask whether they have signed an agreement and how the experience has been so far.',
      },
      {
        slug: 'just-looking',
        phrase: '"I\'m just looking."',
        answer: 'Ask what caught their eye, which turns browsing into a conversation about their timing and needs.',
      },
      {
        slug: 'call-me-later',
        phrase: '"Can you call me later?"',
        answer: 'Offer to be quick, or agree on a specific time and set a reminder to call then.',
      },
      {
        slug: 'price-too-high',
        phrase: '"The price is too high."',
        answer: 'Ask what they are comparing it to before you defend anything.',
      },
      {
        slug: 'want-to-sell-ourselves',
        phrase: '"We want to sell it ourselves."',
        answer: 'Say you are not calling to change their mind, then ask how it has been going so far.',
      },
      {
        slug: 'need-to-think-about-it',
        phrase: '"I need to think about it."',
        answer: 'Ask whether it is about timing or about making sure it is the right move.',
      },
      {
        slug: 'not-interested',
        phrase: '"I\'m not interested."',
        answer: 'Accept it, then ask whether anything in their situation has them considering a change.',
      },
      {
        slug: 'bad-experience-with-agents',
        phrase: '"I had a bad experience with an agent."',
        answer: 'Thank them for telling you and ask what happened before you say anything about yourself.',
      },
      {
        slug: 'market-is-bad',
        phrase: '"The market is bad right now."',
        answer: 'Ask what specifically concerns them: prices, rates, or the general uncertainty.',
      },
      {
        slug: 'just-send-listings',
        phrase: '"Just send me some listings."',
        answer: 'Agree, then ask what is behind the move so what you send is relevant.',
      },
      {
        slug: 'how-much-is-your-commission',
        phrase: '"How much is your commission?"',
        answer: 'Call it a fair question, promise to walk through it, and first ask what matters most to them in an agent.',
      },
      {
        slug: 'well-wait-for-spring',
        phrase: '"We\'ll wait for spring."',
        answer: 'Ask whether spring is when they want to move or when they want to start exploring options.',
      },
      {
        slug: 'my-spouse-needs-to-decide',
        phrase: '"My spouse needs to decide."',
        answer: 'Agree it should be a joint decision and offer a short summary they can share at home.',
      },
    ],
  },
  guideSections: [
    {
      heading: 'What Does Objection Handling Mean in Real Estate?',
      paragraphs: [
        'Real estate objection handling is what you do in the half-second after a prospect pushes back: whether you flinch, fill the silence and start apologizing, or stay calm and ask one more question. Most agents lose the call there, not on the script. They hear "I already have an agent," say "oh, okay, sorry to bother you," and hang up on a live lead.',
        'An objection is not a no. It is the prospect telling you where the resistance lives. "I need to think about it" means they are not convinced yet. "Your commission is too high" means they do not see the value gap. "We\'ll wait until spring" means urgency has not surfaced. Treat each one as information, not rejection, and the whole call changes.',
        'Good objection handling means hearing the objection underneath the objection. A seller who says "the market is too uncertain" is rarely worried about the market in the abstract. They are worried about pricing wrong, moving twice, or selling before they buy. If you argue with the surface statement, you lose. If you ask the question that brings the real concern to the surface, the conversation keeps going.',
        'Delivery matters as much as the words. The pause before you respond signals confidence or panic. Your tone either matches their resistance and escalates it, or lowers it. The follow-up question either gives them an exit or [keeps the conversation moving](/blog/how-to-keep-control-of-a-call/). That is why reading scripts the night before does not transfer to the call; to hear how it sounds, see [what top agents say on calls](/blog/what-top-agents-say-on-calls/).',
      ],
    },
    {
      heading: 'What Is the Acknowledge, Redirect, Advance Frame?',
      paragraphs: [
        'Every strong objection response follows the same three beats. Learn the beats, not a hundred scripts, and you can handle objections you have never heard before.',
        'Acknowledge: lower the resistance before you say anything else. "Totally fair." "That makes sense." "Most people feel that way." You are not agreeing that they should hang up; you are signaling that you heard them and are not going to fight.',
        'Redirect: ask a question that moves the conversation from their objection to their motivation. Instead of defending your value, get curious about their situation. "Out of curiosity, what would have to change for a move to make sense?"',
        'Advance: aim every response at the next step, not at winning the point. The goal is a 20-minute meeting or a clear next action. You can win the debate and still lose the appointment.',
      ],
      script: {
        label: 'The Acknowledge, Redirect, Advance Frame in Action',
        lines: [
          'Prospect: "We\'re really not looking to do anything right now."',
          'You: "Totally fair, most folks I talk to aren\'t actively looking. Out of curiosity, if the timing were right, where would you even be looking to go next? ... Got it. That\'s exactly the kind of thing worth mapping out before you\'re under pressure. Would it be crazy to grab 20 minutes this week so you\'ve got a plan ready either way?"',
        ],
      },
      after: [
        'Acknowledge the resistance, redirect to where they would go, advance to the meeting. No pitch about how great you are. For keeping that calm, low-pressure tone, see [how to not sound salesy](/blog/how-to-not-sound-salesy/).',
      ],
    },
    {
      heading: 'Why Are Most Objections About Motivation?',
      paragraphs: [
        'An objection is almost always a motivation problem in disguise. When motivation is high, objections shrink. A seller who needs to relocate for a job in 60 days does not say "we\'ll wait until spring." A buyer whose lease ends in 45 days does not say "I need to think about it." The objection grows where motivation is weak or unspoken.',
        'That is why the best response to most objections is a motivation question, not a rebuttal. Motivation sits in three layers: the surface reason ("we want something bigger"), the emotional reason ("our second baby is coming") and the consequential reason ("the baby is due in four months and we can\'t renew our lease"). Most objections live at the surface. Most appointments get booked when you reach the consequential layer.',
      ],
      script: {
        label: 'Trading an Objection for Motivation',
        lines: [
          'Prospect: "We\'re just not in a rush."',
          'You: "Makes sense, no pressure at all. I\'m just curious though, what first got you thinking about a move in the first place? ... And if nothing changed over the next year, would that be totally fine, or would that start to be a problem?"',
        ],
      },
      after: [
        'That second question reaches for the consequential layer. When a prospect says "well, it would start to be a problem, because...", they have handed you their timeline. To build this skill, see [how to guide a sales conversation](/blog/how-to-guide-a-sales-conversation/). For how objection handling fits into the whole call, see the [real estate cold calling guide](/blog/real-estate-cold-calling-guide/).',
      ],
    },
    {
      heading: 'What Separates Good Objection Handling From Great?',
      paragraphs: [
        'The agents who handle objections best are not the ones with the cleverest lines. They stay calm and keep asking questions.',
      ],
      bullets: [
        'An objection is information, not rejection. The prospect who objects is still on the phone.',
        'Acknowledge first, always. "Totally fair" disarms more pushback than any rebuttal.',
        'Answer the objection underneath the objection. One question brings the true concern to the surface.',
        'Never win the argument at the cost of the appointment. Always advance toward the calendar.',
        'Most objections are weak motivation in disguise. When you cannot crack one head-on, ask a motivation question instead.',
        'Tone and pacing carry the words. The pause and the calm delivery do more than the script.',
      ],
    },
  ],
  relatedReading: {
    heading: 'Go Deeper on Objection Handling',
    paragraphs: [
      'Each of the most common objections has a full guide with word-for-word responses. When a seller pushes back on your fee, start with [what to say when your commission is too high](/blog/commission-too-high-objection/). When a seller wants a higher list price than the market supports, use the [price too high objection scripts](/blog/price-too-high-objection/). For prospects who stall, read [how to handle "I need to think about it"](/blog/think-about-it-objection/), and for the brush-off you hear most on prospecting calls, see [responses to "I already have an agent"](/blog/already-have-an-agent-objection/).',
      'Timing objections get their own guides too: [what to say when the market feels uncertain](/blog/market-uncertain-objection/) and [how to answer "we\'ll wait until spring"](/blog/wait-until-spring-objection/). When the pushback comes up during a conversation about price, terms or commission, see our [real estate negotiation scripts](/blog/real-estate-negotiation-scripts/).',
    ],
  },
  childPages: [
    {
      title: '"I\'m Not Ready Yet"',
      slug: 'not-ready-yet',
      description: 'How to keep the conversation going when a prospect says they are not ready to act.',
      keyword: 'how to handle "not ready yet" real estate',
      linkText: 'Handle the "not ready yet" objection',
    },
    {
      title: '"Already Working with an Agent"',
      slug: 'already-have-an-agent',
      description: 'What to say when a prospect tells you they already have representation.',
      keyword: 'how to handle "already working with agent"',
      linkText: 'What to say when they have an agent',
    },
    {
      title: '"Just Looking"',
      slug: 'just-looking',
      description: 'How to redirect a casual browser into a real conversation.',
      keyword: 'how to respond to "just looking" real estate',
      linkText: 'Respond to "just looking"',
    },
    {
      title: '"Call Me Later"',
      slug: 'call-me-later',
      description: 'Scripts for when a prospect tries to end the call with a vague follow-up.',
      keyword: 'real estate script for "call me later"',
      linkText: 'Get the "call me later" script',
    },
    {
      title: '"The Price Is Too High"',
      slug: 'price-too-high',
      description: 'How to handle pricing objections without getting defensive.',
      keyword: 'how to handle price objection real estate',
      linkText: 'Handle price objections confidently',
    },
    {
      title: '"We Want to Sell Ourselves"',
      slug: 'want-to-sell-ourselves',
      description: 'Response frameworks for FSBO-minded homeowners.',
      keyword: 'FSBO objection handling',
      linkText: 'FSBO objection scripts',
    },
    {
      title: '"I Need to Think About It"',
      slug: 'need-to-think-about-it',
      description: 'What to say when a prospect shuts down the conversation.',
      keyword: 'what to say when prospect shuts down',
      linkText: 'When a prospect needs to "think about it"',
    },
    {
      title: '"Not Interested"',
      slug: 'not-interested',
      description: 'How to distinguish between a real no and a reflexive brush-off.',
      keyword: 'what to say when lead is not interested',
      linkText: 'Overcome "not interested"',
    },
{
      title: '"Bad Experience with Agents"',
      slug: 'bad-experience-with-agents',
      description: 'How to rebuild trust with a prospect burned by a previous agent.',
      keyword: 'how to handle bad agent experience objection',
      linkText: 'Rebuild trust after a bad experience',
    },
    {
      title: '"The Market Is Bad"',
      slug: 'market-is-bad',
      description: 'How to reframe market concerns into motivation.',
      keyword: 'how to handle market objection real estate',
      linkText: 'Reframe the market objection',
    },
    {
      title: '"Just Send Me Listings"',
      slug: 'just-send-listings',
      description: 'How to redirect a passive request into an active conversation.',
      keyword: 'how to redirect a conversation real estate',
      linkText: 'Turn "send listings" into a conversation',
    },
    {
      title: '"How Much Is Your Commission?"',
      slug: 'how-much-is-your-commission',
      description: 'Scripts for handling the commission question without losing the prospect.',
      keyword: 'how to handle commission question real estate',
      linkText: 'Navigate the commission question',
    },
    {
      title: '"We\'ll Wait for Spring"',
      slug: 'well-wait-for-spring',
      description: 'How to handle timing objections tied to market seasonality.',
      keyword: 'how to handle timing objection real estate',
      linkText: 'Handle timing objections',
    },
    {
      title: '"My Spouse Needs to Decide"',
      slug: 'my-spouse-needs-to-decide',
      description: 'What to say when the decision maker is not on the call.',
      keyword: 'how to handle third-party objection real estate',
      linkText: 'Handle the third-party objection',
    },
  ],
  howSaysoHelps:
    'Sayso guides you through these objections in real time, the moment a prospect pushes back, the right response appears on your screen. No memorization required. You sound like you have been doing this for years, even if you\'re new on the phone.',
  faq: [
    {
      question: 'What are the most common real estate objections?',
      answer:
        '"Not ready yet," "already have an agent," "not interested," and "call me later" come up constantly on prospecting calls. The list at the top of this page covers 14 common objections with a one-line answer to each.',
    },
    {
      question: 'How do you handle objections in real estate?',
      answer:
        'The best approach is to validate the prospect\'s position first, then ask a follow-up question that reopens the conversation. Never argue or get defensive.',
    },
    {
      question: 'Why do prospects raise objections on cold calls?',
      answer:
        'Usually because motivation is low or unspoken, not because they have a specific reason to say no. An objection marks the spot where the prospect feels resistance. When you uncover a strong enough reason to move, most objections fade on their own.',
    },
    {
      question: 'How many times should I respond to the same objection before backing off?',
      answer:
        'Address a real objection two, at most three times, and always with a question rather than a harder pitch. If the prospect repeats it a third time, it is usually sincere, so pivot to a softer next step or ask permission to follow up.',
    },
    {
      question: 'Is it better to memorize objection scripts or improvise?',
      answer:
        'Learn the three-step frame (acknowledge, redirect, advance) rather than a hundred individual scripts. The frame holds up against objections you have never heard, while memorized lines fall apart the moment a prospect goes off-script.',
    },
  ],
};


export { objectionsHub };
