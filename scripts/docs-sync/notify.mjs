const token=process.env.DASH_SLACK_BOT_TOKEN;
const channel=process.env.DASH_SLACK_CHANNEL_ID;
const sha=process.env.PUBLISHED_SHA;
if(!token||!channel||!/^([a-f0-9]{40})$/.test(sha||''))throw Error('Missing Dash configuration or verified published SHA');
const res=await fetch('https://slack.com/api/chat.postMessage',{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({channel,text:'Sayso Help Center update published. <https://www.asksayso.com/help/support/whats-new/|What’s New> · <https://github.com/asksaysodev/sayso-landing/commit/'+sha+'|Published changes>',unfurl_links:false,unfurl_media:false}),signal:AbortSignal.timeout(15000)});
const body=await res.json();if(!res.ok||!body.ok)throw Error('Dash notification failed: '+(body.error||res.status));
