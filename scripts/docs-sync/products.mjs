// Which files in each product count as customer-facing interface. Only these are sent to Claude.
// Anything else (server code, matching logic, prompts, config, tests) stays on the runner.
export const PRODUCTS = {
  'sayso-web-app': {
    name: 'Web app',
    include: [/^src\//, /^public\//, /^index\.html$/],
  },
  'sayso-desktop-app': {
    name: 'Desktop app',
    include: [/^src\//, /^electron\/(?!.*(?:api|auth|token|secret|crypto))/i, /^public\//],
  },
  'sayso-map': {
    name: 'Sayso Map',
    include: [/^public\//, /^lib\/(?:pdf|email)-template\.mjs$/],
  },
  'sayso-composer': {
    name: 'Sayso Composer',
    include: [/^src\/(?:app|components)\/(?!(?:.*\/)?api\/)/, /^public\//],
  },
  'sayso-backend': {
    name: 'Emails',
    include: [/^email_templates\//],
  },
};

const EXCLUDE = [
  /(?:^|\/)(?:__tests__|tests?|e2e|fixtures|mocks?)\//i,
  /\.(?:test|spec|stories)\.[cm]?[jt]sx?$/i,
  /(?:^|\/)\.env/i,
  /\.(?:lock|map|snap)$/i,
  /(?:^|\/)package(?:-lock)?\.json$/,
];

export function isInterfaceFile(repo, file) {
  const p = PRODUCTS[repo];
  if (!p) throw Error('Unknown product ' + repo);
  return p.include.some((r) => r.test(file)) && !EXCLUDE.some((r) => r.test(file));
}
