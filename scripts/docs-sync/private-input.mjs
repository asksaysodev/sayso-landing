const tokens=text=>text.replace(/([a-z])([A-Z])/g,'$1 $2').toLowerCase().match(/[a-z]{5,}/g)||[];

export function makePrivateInput(repo,files,articles){
 if(!files.length||files.length>20||files.some(f=>typeof f.patch!=='string'))return null;
 const changedWords=new Set(files.flatMap(file=>tokens(file.filename.split('/').at(-1))));
 const score=article=>new Set(tokens(article.path+' '+article.content).filter(word=>changedWords.has(word))).size;
 const detailed=new Set([...articles].sort((a,b)=>score(b)-score(a)).slice(0,9).map(a=>a.path));
 const input={
   product:repo,
   files:files.map(({filename,patch},i)=>({id:i+1,filename,patch})),
   articles:articles.map(({path,content},i)=>({
     id:i+1,path,
     outline:detailed.has(path)
       ?content.split('\n').filter(l=>/^title:|^##? |<Ui>|<(?:Screenshot|Clip|Phone)\b/.test(l)).join('\n').slice(0,850)
       :content.split('\n').find(l=>l.startsWith('title:')),
   })),
 };
 return JSON.stringify(input).length<=47000?input:null;
}
