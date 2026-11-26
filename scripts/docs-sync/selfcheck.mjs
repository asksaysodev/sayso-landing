// Inside the draft job: run the publish checks and the site build on Claude's draft.
// On failure, write .docs-sync/fix.txt so Claude can fix its own work before anything is published.
// Usage: node selfcheck.mjs <base-sha> <tools-dir>
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const [base, tools] = process.argv.slice(2);
const out = (k, v) => fs.appendFileSync(process.env.GITHUB_OUTPUT || '/dev/null', `${k}=${v}\n`);
const issues = [];

spawnSync(process.execPath, [path.join(tools, 'check.mjs'), base], { stdio: 'inherit' });
let gates = { problems: ['The checks did not run.'] };
try { gates = JSON.parse(fs.readFileSync('.docs-sync/gates.json', 'utf8')); } catch {}
issues.push(...gates.problems.map((p) => 'Check: ' + p));

if (gates.decision === 'publish' && !issues.length) {
  const build = spawnSync('npm', ['run', 'build'], { encoding: 'utf8', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }, maxBuffer: 64 * 1024 * 1024 });
  if (build.status !== 0) {
    const log = (build.stdout + '\n' + build.stderr).split('\n');
    const at = log.findIndex((l) => /error|failed/i.test(l));
    issues.push('Site build failed:\n' + log.slice(Math.max(0, at - 5), at + 40).join('\n'));
  }
}

if (issues.length) {
  fs.writeFileSync('.docs-sync/fix.txt', 'Fix these problems in your draft:\n\n' + issues.join('\n\n') + '\n');
  console.log('Self-check failed:\n' + issues.join('\n'));
  out('ok', 'false');
} else {
  fs.rmSync('.docs-sync/fix.txt', { force: true });
  console.log('Self-check passed.');
  out('ok', 'true');
}
