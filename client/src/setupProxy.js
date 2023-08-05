const { createProxyMiddleware } = require('http-proxy-middleware');
const url='https://coding-platform-bitcode.onrender.com'
module.exports = function (app) {
  app.use(
    '/sendq',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/test',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/submit',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/qlist',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/add',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/input',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  );
  app.use(
    '/register',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
  app.use(
    '/login',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
  app.use(
    '/sendmail',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
  app.use(
    '/forgetpassword/:token',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
  app.use(
    '/home',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
};