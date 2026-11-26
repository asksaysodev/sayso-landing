// Only these already-public Help Center concepts can appear in model input.
export const topics = ['appointments','billing','call recording','coach widget','company','conversations','dashboard','download','email reports','filters','installation','invites','keyboard shortcuts','map','meeting detection','microphone','notifications','permissions','playbooks','roles','scripts','search','settings','sign in','subscription','teams','troubleshooting','updates'];
export function topicIds(text) {
 const normalized=text.replace(/([a-z])([A-Z])/g,'$1 $2').toLowerCase().replace(/[^a-z0-9]+/g,' ');
 return topics.flatMap((term,i)=>normalized.includes(term)?[i]:[]);
}
function safe(list){
 return Array.isArray(list)&&list.length<=topics.length&&list.every(n=>Number.isInteger(n)&&n>=0&&n<topics.length)&&new Set(list).size===list.length;
}
export function outbound(changed,articles){
 if(!safe(changed)||!Array.isArray(articles)||articles.length>30)throw Error('Invalid topic request');
 const rows=articles.map((ids,slot)=>{
   if(!safe(ids))throw Error('Invalid article topics');
   return {slot,topics:topics.filter((_,i)=>ids.includes(i))};
 });
 return {changedTopics:topics.filter((_,i)=>changed.includes(i)),articles:rows};
}
