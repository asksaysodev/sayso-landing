import {outbound} from './topics.mjs';
let attempts=0;
export async function reviewTopics(changed,articles){
 const payload=outbound(changed,articles);
 const body=JSON.stringify({model:'claude-haiku-4-5-20251001',max_tokens:1024,output_config:{format:{type:'json_schema',schema:{type:'object',properties:{slots:{type:'array',items:{type:'integer'}}},required:['slots'],additionalProperties:false}}},system:'Classify Help Center topic relationships. Return the slot numbers that merit human inspection given changedTopics. Include indirect dependencies. Do not generate factual claims.',
   messages:[{role:'user',content:JSON.stringify(payload)}]});
 for(let retry=0;retry<3;retry++){
   if(++attempts>24)throw Error('Model request budget reached');
   const response=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',redirect:'error',
     headers:{'x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','Content-Type':'application/json'},
     body,signal:AbortSignal.timeout(45000)});
   if(!response.ok){
     if([429,502,503,529].includes(response.status)&&retry<2){await new Promise(done=>setTimeout(done,2000*2**retry));continue;}
     throw Error('Anthropic topic review returned HTTP '+response.status);
   }
   const data=await response.json();
   let slots;
   try{slots=JSON.parse(data.content[0].text.trim().replace(/^```(?:json)?\s*|\s*```$/g,'')).slots;}catch{throw Error('Invalid topic review response');}
   if(data.stop_reason!=='end_turn'||!Array.isArray(slots)||slots.length>articles.length||
     !slots.every(n=>Number.isInteger(n)&&n>=0&&n<articles.length)||new Set(slots).size!==slots.length)throw Error('Unexpected topic review slots');
   return slots;
 }
}
