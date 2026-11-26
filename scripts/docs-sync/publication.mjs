import crypto from 'node:crypto';
const base='https://www.asksayso.com';
const slug=/^content\/help\/([a-z0-9-]+)\/([a-z0-9-]+)\.mdx$/;

export function classify(files) {
 if(!files.length)return 'review';
 for(const f of files){
   if(!slug.test(f.filename)||f.filename.endsWith('/whats-new.mdx')||f.status!=='modified'||!f.patch)return 'review';
   const lines=f.patch.split('\n').filter(x=>/^[-+]/.test(x));
   const before=lines.filter(l=>l.startsWith('-')).map(l=>l.slice(1));
   const after=lines.filter(l=>l.startsWith('+')).map(l=>l.slice(1));
   if(!before.length||before.length!==after.length||before.length!==f.deletions||after.length!==f.additions)return 'review';
   // Only an allowlisted typo in plain prose qualifies; markdown layout and MDX always go to review.
   if(!before.every((l,i)=>/^[A-Za-z0-9 ,.'!?]+$/.test(l)&&l!==after[i]&&
      l.replace(/\bteh\b/g,'the').replace(/\brecieve\b/g,'receive')===after[i]))return 'review';
 }
 return 'low-risk';
}

export function dashMessage(pr,files,releases) {
 if(!Number.isSafeInteger(pr)||pr<=0||!releases.length)throw Error('Missing publication evidence');
 const fields={Created:[],Updated:[],Screenshots:[],Recordings:[]};
 let notes=false;
 for(const f of files){
   const article=slug.exec(f.filename);
   if(article && f.status!=='removed'){
     fields[f.status==='added'?'Created':'Updated'].push('<'+base+'/help/'+article[1]+'/'+article[2]+'/|'+article[2].replaceAll('-',' ')+'>');
     if(article[2]==='whats-new')notes=true;
   }else if(/^public\/help\/[a-z0-9/_.-]+\.(webp|mp4)$/.test(f.filename)){
     fields[f.filename.endsWith('.mp4')?'Recordings':'Screenshots'].push(f.status+' '+f.filename.split('/').pop());
   }
 }
 const refs=releases.map(r=>{
   if(!['sayso-desktop-app','sayso-web-app','sayso-backend','sayso-map','sayso-composer'].includes(r.repo)||!(/^[a-f0-9]{40}$/.test(r.sha)))throw Error('Invalid product reference');
   return r.repo.replace('sayso-','')+' '+r.sha.slice(0,8);
 });
 return ['Sayso Help Center published · '+refs.join(', '),...Object.entries(fields).filter(([,v])=>v.length).map(([k,v])=>k+': '+v.join(', ')),
   (notes?'Release notes updated · ':'')+'<'+base+'/help/support/whats-new/|What’s New> · <https://github.com/asksaysodev/sayso-landing/pull/'+pr+'|Documentation PR>'].join('\n');
}
export function messageId(key){
 const id=crypto.createHash('sha256').update(key).digest('hex').slice(0,32).split('');
 id[12]='5';id[16]='8';
 return id.join('').replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/,'$1-$2-$3-$4-$5');
}
