const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118729", "root", "", {
    host: "localhost",
    dialect: "mysql"
});
const db = {};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.vjezba = require('./models/vjezba.js')(sequelize)
db.zadatak = require('./models/zadatak.js')(sequelize)

//relacije
db.vjezba.hasMany(db.zadatak,{as:'vjezbaId'});

module.exports=db;