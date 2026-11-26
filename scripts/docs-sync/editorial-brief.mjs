// Only the customer-facing facts written here can leave the runner.
// Selectors and historical release identifiers are used to verify inputs inside GitHub.
const catalog = {
  condition: {
    product:'Sayso Map',
    task:'Understand a condition rating on a similar home',
    existing:'Find comps with Sayso Map explains how to search and read the results.',
    covered:'What Sayso Map condition ratings mean explains the badges and their details.',
    facts:[
      'Similar homes can display a condition badge based on available listing photos.',
      'The labels include New, Fully updated, Updated, Average, Dated and Needs work.',
      'Opening the badge can show visible details and information attributed to the listing.',
      'Condition n/a means a rating is unavailable.',
    ],
  },
  estimate: {
    product:'Sayso Map',
    task:'Understand an off-market value estimate and its confidence label',
    existing:'Find comps with Sayso Map explains how to search and read the results.',
    covered:'Understand off-market value estimates in Sayso Map explains the estimate and confidence.',
    facts:[
      'For an off-market home, Map can show an automated value estimate labeled AVM.',
      'The estimate can show High, Medium or Low confidence.',
      'The information icon next to the confidence label opens guidance on how to use the estimate.',
    ],
  },
  templates: {
    product:'Sayso Map',
    task:'Change the message that Map prepares for a lead',
    existing:'Change Sayso Map filters already explains how to edit the text template.',
    covered:'Change Sayso Map filters covers editing templates that appear under Text to send.',
    facts:[
      'The previous Filters screen had a single text template.',
      'Under Text template, Filters now offers separate Buyer text and Seller text editors.',
      'Map uses Buyer text for a home listed for sale and Seller text for an off-market home.',
      'Each editor has its own Reset control.',
    ],
  },
  scriptWizard: {
    product:'Sayso Composer',
    task:'Build a script using the Composer on-screen questions',
    existing:'What Sayso Composer is already includes a Build a script section.',
    covered:'What Sayso Composer is already includes a Build a script section.',
    facts:[
      'The existing workflow still uses the Composer script wizard.',
      'The wizard and progress indicator were restyled.',
      'Review screenshots of the wizard for the current layout.',
    ],
  },
  manageBilling: {
    product:'Sayso Web App',
    task:'Open the existing billing page to manage a subscription',
    existing:'Your subscription already explains how to open Manage billing.',
    covered:'Your subscription already explains how to open Manage billing.',
    facts:[
      'The existing Manage billing control remains on the Subscription screen.',
      'The button is top-aligned in its card and uses the secondary button style.',
      'Review screenshots of the Subscription screen for the current placement.',
    ],
  },
  meetingDetection: {
    product:'Sayso Desktop',
    task:'Start coaching when Sayso detects a browser call',
    existing:'The general session guide explains how to start coaching.',
    covered:'The Meeting detection article explains how to start coaching from the prompt.',
    facts:[
      'Meeting detection can show a prompt when a call starts in a supported web browser.',
      'The prompt lets the agent start coaching for a buyer or seller call.',
      'Meeting detection has a setting that allows the agent to turn it off.',
    ],
  },
};

export function buildEditorialBrief(topic, hasArticle) {
  if (!Object.hasOwn(catalog,topic) || typeof hasArticle!=='boolean') throw Error('Unapproved editorial evidence');
  const {product,task,existing,covered,facts}=catalog[topic];
  return {
    product,task,existingHelp:hasArticle?covered:existing,
    facts:facts.map((text,index)=>({id:index+1,text})),
  };
}
