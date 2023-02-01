const Sequelize = require('sequelize')

const db = new Sequelize({
    database:'afkvvbew_medicard',
    username: 'afkvvbew_admin',
    password: 'adminmedicard8819306',
    host: '162.0.210.163',
    poer:3306,
    dialect: 'mysql',
    // logging: false,
    dialectOptions: {
        ssl: {
          require: true, // This will help you. But you will see nwe error
          rejectUnauthorized: false // This line will fix new error
        }
      },
});

module.exports = db;