import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const args = process.argv.slice(2);
const portIndex = args.indexOf("--port");
const port = portIndex >= 0 ? Number(args[portIndex + 1]) : 4173;
const host = args.includes("--host") ? (args[args.indexOf("--host") + 1] || "0.0.0.0") : "0.0.0.0";
const root = process.cwd();
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".json": "application/json" };

createServer((req, res) => {
  const requested = decodeURIComponent((req.url || "/").split("?")[0]);
  const relative = requested === "/" ? "index.html" : requested.replace(/^\/+/, "");
  const candidate = normalize(join(root, relative));
  const directoryIndex = candidate.startsWith(root) && existsSync(candidate) && statSync(candidate).isDirectory()
    ? join(candidate, "index.html")
    : null;
  const file = candidate.startsWith(root) && existsSync(candidate) && statSync(candidate).isFile()
    ? candidate
    : directoryIndex && existsSync(directoryIndex)
      ? directoryIndex
      : join(root, "index.html");
  res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" });
  createReadStream(file).pipe(res);
}).listen(port, host, () => console.log(`Barrier Intelligence preview: http://${host}:${port}`));
