import fs from "node:fs";

const rabbit = "\u{1F407}";
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y="0.9em" x="50%" text-anchor="middle" font-size="88">${rabbit}</text>
</svg>
`;

fs.writeFileSync(new URL("../public/favicon.svg", import.meta.url), svg, "utf8");
