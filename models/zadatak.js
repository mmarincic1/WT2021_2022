const Sequelize = require("sequelize");
const sequelize = require("../baza.js");
module.exports = function (sequelize, DataTypes) {
    const Zadatak = sequelize.define('Zadatak', {
        
    });
    return Zadatak;
}
