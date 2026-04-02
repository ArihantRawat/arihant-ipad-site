import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const exts = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".json", ".css", ".html"]);
const skip = ["node_modules", ".next", "package-lock.json"];
const banned = [/\bcaleb\b/i, /\bcnewt\b/i, /calebnewton/i, /klubnootuhn/i, /caleeb/i];

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const rel = path.relative(root, p);
    if (skip.some((s) => rel.includes(s))) continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else if (exts.has(path.extname(p))) acc.push(p);
  }
  return acc;
}

const files = walk(root);
const hits = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    banned.forEach((rx) => {
      if (rx.test(line)) hits.push(`${path.relative(root, file)}:${i + 1} :: ${line.trim()}`);
    });
  });
}

if (hits.length) {
  console.error("Integrity check failed. Legacy tokens found:\n");
  console.error(hits.join("\n"));
  process.exit(1);
}

console.log("Integrity check passed.");
