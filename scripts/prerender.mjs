/**
 * Injects a static render of the playbook into the built index.html.
 *
 * Run after `vite build`. Uses Vite's own SSR loader so the TypeScript, JSX,
 * path aliases and CSS imports resolve exactly as they do in the app build; no
 * separate SSR bundle or extra dependency is needed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";

const outDir = resolve(process.cwd(), process.argv[2] ?? "dist");
const indexPath = resolve(outDir, "index.html");

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

let markup;
try {
  const { StaticPlaybook } = await vite.ssrLoadModule("/src/prerender.tsx");
  markup = renderToStaticMarkup(createElement(StaticPlaybook));
} finally {
  await vite.close();
}

const html = readFileSync(indexPath, "utf8");
const root = '<div id="root"></div>';
if (!html.includes(root)) {
  throw new Error(`prerender: could not find ${root} in ${indexPath}`);
}

writeFileSync(indexPath, html.replace(root, `<div id="root">${markup}</div>`));
console.log(`prerender: injected ${(markup.length / 1024).toFixed(0)} KB of static HTML into ${indexPath}`);
