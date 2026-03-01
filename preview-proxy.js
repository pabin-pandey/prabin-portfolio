/**
 * preview-proxy.js
 * Simple proxy to prabinpandey.com for local preview verification.
 * Used because OneDrive corrupts .next build chunks preventing local Next.js start.
 */
const http = require("http");
const https = require("https");

const TARGET = "www.prabinpandey.com";
const PORT = 3007;

const server = http.createServer((req, res) => {
  const options = {
    hostname: TARGET,
    port: 443,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: TARGET },
  };

  const proxy = https.request(options, (proxyRes) => {
    // Strip headers that break local display
    const headers = { ...proxyRes.headers };
    delete headers["content-security-policy"];
    delete headers["x-frame-options"];
    res.writeHead(proxyRes.statusCode, headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on("error", (err) => {
    res.writeHead(502);
    res.end("Proxy error: " + err.message);
  });

  req.pipe(proxy, { end: true });
});

server.listen(PORT, () => {
  console.log(`Proxy ready — forwarding localhost:${PORT} → https://${TARGET}`);
});
