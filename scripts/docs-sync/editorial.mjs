import {setTimeout as delay} from 'node:timers/promises';
import {buildEditorialBrief} from './editorial-brief.mjs';

const instructions = [
  'You are a Sayso Help Center editor. Use only the supplied customer-facing facts.',
  'Choose update if the existing article already answers the customer task. Choose new if the task adds a standalone customer question the existing article does not answer. Choose skip for a change that does not affect customer instructions or screenshots.',
  'Return a plain-text draft for new or update, 1 to 4 short sentences. If the change only affects screenshots, say what needs recapturing and keep the existing instructions. For skip leave draft empty.',
  'Return the numeric evidence IDs supporting the draft. Avoid copying markup, internal details, or adding facts. Use exact user-facing labels and Sayso capitalization. Avoid em dashes and marketing language.',
].join(' ');

export function validateEditorialResult(result, brief) {
  if (!result || !['new','update','skip'].includes(result.action) ||
      !Array.isArray(result.evidence) || result.evidence.some(id=>!brief.facts.some(f=>f.id===id)) ||
      new Set(result.evidence).size!==result.evidence.length ||
      typeof result.draft!=='string'||result.draft.length>900 ||
      /[<>{}`—]|https?:\/\/|\b(?:SK|API)[_-]?KEY\b/i.test(result.draft) ||
      (result.action==='skip' ? Boolean(result.draft.trim()) : (!result.draft.trim()||!result.evidence.length))) {
    throw Error('Unusable editorial response');
  }
  return {action:result.action,draft:result.draft,evidence:result.evidence};
}

export async function reviewEditorialEvidence(topic,hasArticle){
  const brief=buildEditorialBrief(topic,hasArticle);
  const key=process.env.ANTHROPIC_API_KEY;
  if(!key)throw Error('Missing Anthropic credential');
  const body=JSON.stringify({
    model:'claude-haiku-4-5-20251001',
    max_tokens:640,
    system:instructions,
    output_config:{format:{type:'json_schema',schema:{
      type:'object',additionalProperties:false,required:['action','draft','evidence'],
      properties:{action:{type:'string',enum:['new','update','skip']},draft:{type:'string'},
        evidence:{type:'array',items:{type:'integer'}}},
    }}},
    messages:[{role:'user',content:JSON.stringify(brief)}],
  });
  for(let attempt=0;attempt<3;attempt++){
    const response=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',redirect:'error',signal:AbortSignal.timeout(45000),
      headers:{'x-api-key':key,'anthropic-version':'2023-06-01','Content-Type':'application/json'},body,
    });
    if(!response.ok){
      if([429,502,503,529].includes(response.status)&&attempt<2){await delay(2000*2**attempt);continue;}
      throw Error('Anthropic editorial review returned HTTP '+response.status);
    }
    const payload=await response.json();
    if(payload.stop_reason!=='end_turn')throw Error('Editorial review did not finish');
    let result;
    try {result=JSON.parse(payload.content.find(block=>block.type==='text')?.text);}
    catch {throw Error('Invalid editorial response');}
    return validateEditorialResult(result,brief);
  }
}
