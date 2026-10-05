import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "products");

const W = 800;
const H = 1000;

const palettes = [
  { id: "light-blue", label: "Light Blue", bg: "#C9D7E4", fg: "#2A3440", accent: "#A9C1D9" },
  { id: "indigo", label: "Indigo", bg: "#3B4670", fg: "#E8EAF2", accent: "#2E3A63" },
  { id: "charcoal", label: "Charcoal", bg: "#4A4A4D", fg: "#EDEDED", accent: "#3A3A3C" },
];

const viewAngles = ["Front", "Back", "Detail", "Styled"];

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (c) => `&${{ "<": "lt", ">": "gt", "&": "amp", "'": "apos", '"': "quot" }[c]};`);
}

function svg({ label, view, bg, fg, accent }) {
  const quiltLines = Array.from({ length: 6 }, (_, i) => 330 + i * 78)
    .map((y) => `<line x1="240" y1="${y}" x2="560" y2="${y}" stroke="${fg}" stroke-opacity="0.16" stroke-width="2" />`)
    .join("");

  const seams = Array.from({ length: 4 }, (_, i) => 300 + i * 100)
    .map((y) => `<line x1="272" y1="${y}" x2="400" y2="${y}" stroke="${fg}" stroke-opacity="0.12" stroke-width="2" />`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeXml(label)} in ${escapeXml(view)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${bg}" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)" />
  <g transform="translate(0 40)">
    <path d="M340 180 L270 210 Q236 222 230 268 L214 404 Q212 430 240 436 L268 441 L286 352 L286 806 Q400 830 514 806 L514 352 L532 441 L560 436 Q588 430 586 404 L570 268 Q564 222 530 210 L460 180 Q400 214 340 180 Z" fill="${fg}" fill-opacity="0.9" />
    <path d="M340 180 Q400 214 460 180 L430 156 Q400 172 370 156 Z" fill="${accent}" />
    <line x1="400" y1="196" x2="400" y2="818" stroke="${bg}" stroke-opacity="0.5" stroke-width="3" />
    ${quiltLines}
    ${seams}
    <rect x="292" y="560" width="82" height="96" rx="12" fill="none" stroke="${bg}" stroke-opacity="0.45" stroke-width="3" />
    <rect x="426" y="560" width="82" height="96" rx="12" fill="none" stroke="${bg}" stroke-opacity="0.45" stroke-width="3" />
  </g>
  <text x="48" y="912" fill="${fg}" font-family="Inter, Segoe UI, sans-serif" font-size="38" font-weight="600">${escapeXml(label)}</text>
  <text x="48" y="956" fill="${fg}" fill-opacity="0.7" font-family="Inter, Segoe UI, sans-serif" font-size="28">${escapeXml(view)}</text>
</svg>
`;
}

mkdirSync(outDir, { recursive: true });

let count = 0;
for (const palette of palettes) {
  viewAngles.forEach((view, index) => {
    const name = `${palette.id}-${index + 1}.svg`;
    writeFileSync(join(outDir, name), svg({ label: palette.label, view, ...palette }), "utf8");
    count += 1;
  });
}

console.log(`generated ${count} files in ${outDir}`);