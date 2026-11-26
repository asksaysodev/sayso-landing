// Vercel's verified predecessor of the first GitHub Production record for Map.
// https://vercel.com/sayso-web/sayso-map/7bqLRBUnSqTGhTUvzpTY5ozdzvLS
const mapTransition={
  event:'8078515501-23201152324',
  sha:'2129fd32f2368c402752b5a89475fce08d64b3a7',
};

export function releaseWindow(repo,prior,discovered){
  const combined={...prior.events,...Object.fromEntries(discovered.events.map(event=>[event.id,event]))};
  const ordered=Object.entries(combined).sort(([idA,a],[idB,b])=>a.time.localeCompare(b.time)||idA.localeCompare(idB));
  const current=ordered.findLast(([id,event])=>event.sha===discovered.liveSha);
  if(!current)throw Error('Production release is missing from verified history');
  const start=prior.reviewStart || (prior.liveSha ? null : current[0]);
  const first=start===null?0:ordered.findIndex(([id])=>id===start);
  if(first<0)throw Error('Stored release review starting point is missing');
  const comparisons=ordered.slice(first).map(([id,event],offset)=>{
    const previous=ordered[first+offset-1]?.[1];
    const bridge=repo==='sayso-map'&&id===mapTransition.event&&event.sha===mapTransition.sha
      ?mapTransition.sha:null;
    return {id,from:previous?.sha||bridge,to:event.sha};
  });
  return {start,comparisons};
}
