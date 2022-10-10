const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://checkpoint360webgroup.tk",
      changeOrigin: true,
    })
  );
};
