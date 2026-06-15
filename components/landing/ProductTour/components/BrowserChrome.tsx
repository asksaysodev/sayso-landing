/**
 * A realistic browser window frame (traffic-light buttons + address bar) that
 * wraps the demo so it reads as "this is the product running in a browser tab".
 */
export function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex w-full max-w-md items-center justify-center rounded-md bg-white px-3 py-1 text-[12px] text-slate-400">
          {url}
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
