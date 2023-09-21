const { createProxyMiddleware } = require('http-proxy-middleware');
// const url='https://coding-platform-bitcode.onrender.com'
const url='http://localhost:8000'
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
    '/userregister',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
  app.use(
    '/userlogin',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
  app.use(
    '/userlogout',
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
  app.use(
    '/discussion',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
  app.use(
    '/thread',
    createProxyMiddleware({
      target: url,
      changeOrigin: true,
    })
  )
};