module.exports = {
  apps: [
    {
      name: "express-app",
      script: "./index.js",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "flask-app",
      script: "app/main.py",
      interpreter: "venv/bin/python3",
      instances: 1
    }
  ],

};