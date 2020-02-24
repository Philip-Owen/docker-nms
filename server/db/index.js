const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(
  "nms",
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "postgres",
    define: {
      timestamps: false
    },
    logging: false
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;
