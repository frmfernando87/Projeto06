module.exports = {
  apps: [
    {
      name: "projeto06",
      script: "./src/server.js",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
}
