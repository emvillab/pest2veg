// Writes an auditable report and fails the release gate while TODO checks remain.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'docs/testing');
fs.mkdirSync(output, { recursive: true });
const run = spawnSync(process.execPath, ['--test', '--test-reporter=tap', path.join(__dirname, 'project.test.cjs')],
  { cwd: root, encoding: 'utf8' });
if (run.error) throw run.error;
const raw = run.stdout + run.stderr;
fs.writeFileSync(path.join(output, 'automated-results.tap'), raw);
const metric = name => Number(raw.match(new RegExp(`^# ${name} (\\d+)$`, 'm'))?.[1] ?? 0);
const results = {
  executedAt: new Date().toISOString(), node: process.version,
  method: 'Node built-in test runner; actual scripts in VM with minimal DOM substitute; not browser testing',
  tests: metric('tests'), passed: metric('pass'), unexpectedFailures: metric('fail'),
  knownDefects: metric('todo'), skipped: metric('skipped'), runnerExitCode: run.status,
  releaseGatePassed: run.status === 0 && metric('todo') === 0 && metric('tests') > 0,
  sha256: Object.fromEntries(['app.js','data.js','style.css','index.html','gallery.html','identify.html','pest.html','about.html',
    'tests/project.test.cjs','tests/run-checks.cjs'].map(file => [file,
      crypto.createHash('sha256').update(fs.readFileSync(path.join(root,file))).digest('hex')]))
};
fs.writeFileSync(path.join(output, 'automated-summary.json'), JSON.stringify(results,null,2)+'\n');
const cases = raw.split(/\r?\n/).filter(line => /^(?:not )?ok \d+ - /.test(line));
fs.writeFileSync(path.join(output,'test-results.md'), `# Automated test results\n\nExecuted: ${results.executedAt}. Runtime: ${results.node}.\n\n`+
  `**${results.passed} passed; ${results.knownDefects} known defects; ${results.unexpectedFailures} unexpected failures; ${results.skipped} skipped; ${results.tests} total.**\n\n`+
  `Release gate: **${results.releaseGatePassed ? 'PASS' : 'NOT READY'}**. TODO checks execute; they are unresolved defects, not passes. Node treats TODO failures as nonfatal, so this wrapper deliberately returns a failing release gate while any remain.\n\n`+
  `Method: ${results.method}. This run checks the current file hashes in [automated-summary.json](automated-summary.json). It does not verify visual layout, actual keyboard interaction, assistive technology, remote links, horticultural accuracy or image permissions.\n\n`+
  `Run from the project folder: \`node tests/run-checks.cjs\`. Raw output: [automated-results.tap](automated-results.tap).\n\n`+
  cases.map(line => '- '+line.replace(/#/g,'')).join('\n')+'\n');
console.log(JSON.stringify({tests:results.tests,passed:results.passed,knownDefects:results.knownDefects,
  unexpectedFailures:results.unexpectedFailures,releaseGatePassed:results.releaseGatePassed}));
process.exitCode = results.releaseGatePassed ? 0 : 1;
