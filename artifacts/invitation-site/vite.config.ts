import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const rawPort = process.env.PORT ?? "5173";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const rawBase = process.env.BASE_PATH?.trim();
const basePath =
  !rawBase || rawBase === ""
    ? "/"
    : rawBase.startsWith("/")
      ? rawBase
      : `/${rawBase}`;

const isReplit = process.env.REPL_ID !== undefined;
const devHost = isReplit ? "0.0.0.0" : "localhost";

export default defineConfig({
  clearScreen: false,
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    // Custom dev middleware to resolve Pinterest links and proxy external images to bypass CORS
    {
      name: "image-proxy-middleware",
      configureServer(server) {
        server.middlewares.use("/api/proxy-image", async (req, res) => {
          try {
            const urlObj = new URL(req.url || "", `http://${req.headers.host}`);
            let targetUrl = urlObj.searchParams.get("url");
            if (!targetUrl) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Missing url parameter" }));
              return;
            }

            // 1. If user pasted a Pinterest page link (e.g. https://pin.it/... or https://pinterest.com/pin/...)
            if (targetUrl.includes("pinterest.com") || targetUrl.includes("pin.it")) {
              try {
                const pageResp = await fetch(targetUrl, {
                  headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
                  },
                  redirect: "follow",
                });
                const html = await pageResp.text();

                // Look for og:image or high-res image
                const ogMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
                                html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
                                html.match(/https:\/\/i\.pinimg\.com\/originals\/[a-zA-Z0-9_\/]+\.(jpg|jpeg|png|webp)/i) ||
                                html.match(/https:\/\/i\.pinimg\.com\/736x\/[a-zA-Z0-9_\/]+\.(jpg|jpeg|png|webp)/i);

                if (ogMatch && ogMatch[1]) {
                  targetUrl = ogMatch[1];
                } else if (ogMatch && ogMatch[0]) {
                  targetUrl = ogMatch[0];
                }
              } catch (e) {
                console.error("Pinterest page resolution error:", e);
              }
            }

            // 2. Fetch the actual image data
            const imgResp = await fetch(targetUrl, {
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Referer": "https://www.pinterest.com/",
              },
            });

            if (!imgResp.ok) {
              res.statusCode = imgResp.status;
              res.end(JSON.stringify({ error: `Failed to fetch image: ${imgResp.statusText}` }));
              return;
            }

            const contentType = imgResp.headers.get("content-type") || "image/jpeg";
            const buffer = await imgResp.arrayBuffer();

            res.setHeader("Content-Type", contentType);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Cache-Control", "public, max-age=86400");
            res.end(Buffer.from(buffer));
          } catch (err: any) {
            console.error("Image proxy error:", err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message || "Failed to proxy image" }));
          }
        });
      },
    },
    ...(process.env.REPL_ID !== undefined ? [runtimeErrorOverlay()] : []),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: false,
    host: devHost,
    open: !isReplit,
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    strictPort: false,
    host: devHost,
    allowedHosts: true,
  },
});
