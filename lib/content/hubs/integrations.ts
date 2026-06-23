import type { HubPageConfig } from './types';
import { registerHub } from './index';

const integrationsHub: HubPageConfig = {
  slug: 'integrations',
  section: 'Integrations',
  basePath: '/integrations',
  seoTitle: 'Sayso Integrations: Connect Your CRM',
  seoDescription:
    'Sayso integrates with Follow Up Boss, SureSend, and more. Automatic call notes and real-time coaching that fits your existing workflow.',
  h1: 'Integrations That Fit Your Workflow',
  introduction:
    'Sayso connects to the tools you already use. It is one of the best tools for real estate note taking because notes happen automatically. Call notes sync to your CRM, real-time coaching runs alongside your dialer, and nothing changes about how you work, it just gets better.',
  childPages: [
    {
      title: 'Follow Up Boss',
      slug: 'follow-up-boss',
      href: '/integrations/partners/follow-up-boss',
      description: 'Real-time coaching and automatic call notes synced to your Follow Up Boss contact records.',
      keyword: 'follow up boss AI integration',
      linkText: 'Connect Sayso with Follow Up Boss',
    },
    {
      title: 'SureSend',
      slug: 'suresend',
      href: '/integrations/partners/suresend',
      description: 'Live coaching and automatic notes that work right alongside your SureSend workflow.',
      keyword: 'suresend AI integration',
      linkText: 'See how Sayso works with SureSend',
    },
  ],
  noKeyword: false,
};

registerHub(integrationsHub);

export { integrationsHub };
