import test from 'node:test';
import assert from 'node:assert/strict';
import { isInterfaceFile } from './products.mjs';

test('only interface files are sent to Claude', () => {
  assert.equal(isInterfaceFile('sayso-map', 'public/app.js'), true);
  assert.equal(isInterfaceFile('sayso-map', 'lib/pdf-template.mjs'), true);
  assert.equal(isInterfaceFile('sayso-map', 'lib/match.mjs'), false);
  assert.equal(isInterfaceFile('sayso-map', 'api/search.mjs'), false);
  assert.equal(isInterfaceFile('sayso-web-app', 'src/pages/Settings.tsx'), true);
  assert.equal(isInterfaceFile('sayso-web-app', 'src/pages/Settings.test.tsx'), false);
  assert.equal(isInterfaceFile('sayso-web-app', '.env.production'), false);
  assert.equal(isInterfaceFile('sayso-composer', 'src/components/wizard/Step.tsx'), true);
  assert.equal(isInterfaceFile('sayso-composer', 'src/app/api/generate/route.ts'), false);
  assert.equal(isInterfaceFile('sayso-backend', 'email_templates/welcome.html'), true);
  assert.equal(isInterfaceFile('sayso-backend', 'routes/billing.js'), false);
});
