module.exports = {
  development: {
    isProduction: false,
    port: 3000,
    app: {
      name: 'Redux Boilerplate Development'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    app: {
      name: 'Redux Boilerplate Production'
    }
  }
}[process.env.NODE_ENV || 'development'];
