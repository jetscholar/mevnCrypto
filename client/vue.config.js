module.exports = defineConfig({
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
        }
      }
    }
  }
})