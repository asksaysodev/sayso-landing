import type { HubPageConfig } from './types';
import { registerHub } from './index';

const integrationsHub: HubPageConfig = {
  slug: 'integrations',
  section: 'Integrations',
  basePath: '/integrations',
  seoTitle: 'Sayso Integrations: Connect Your CRM',
  seoDescription:
    'Sayso integrates with Follow Up Boss, Sierra Interactive, kvCORE, and more. Automatic call notes and real-time coaching that fits your existing workflow.',
  h1: 'Integrations That Fit Your Workflow',
  introduction:
    'Sayso connects to the tools you already use. It is one of the best tools for real estate note taking because notes happen automatically. Call notes sync to your CRM, real-time coaching runs alongside your dialer, and nothing changes about how you work, it just gets better.',
  childPages: [
    {
      title: 'Follow Up Boss',
      slug: 'follow-up-boss',
      description: 'Real-time coaching + automatic call notes synced to your FUB contact records.',
      keyword: 'follow up boss AI integration',
      linkText: 'Connect Sayso with Follow Up Boss',
    },
    {
      title: 'Sierra Interactive',
      slug: 'sierra-interactive',
      description: 'AI coaching that works alongside Sierra\'s lead routing and dialer.',
      keyword: 'sierra interactive AI coaching',
      linkText: 'See the Sierra Interactive integration',
    },
    {
      title: 'kvCORE',
      slug: 'kvcore',
      description: 'Call coaching and automatic notes for kvCORE-powered teams.',
      keyword: 'kvcore AI integration',
      linkText: 'How Sayso works with kvCORE',
    },
  ],
  noKeyword: false,
};

registerHub(integrationsHub);

export { integrationsHub };
