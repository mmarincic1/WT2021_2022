const Sequelize = require("sequelize");
const sequelize = require("../baza.js");
module.exports = function (sequelize, DataTypes) {
    const Student = sequelize.define('Student', {
        ime:Sequelize.STRING,
        prezime:Sequelize.STRING,
        index:Sequelize.STRING,
        grupa:Sequelize.STRING
    });
    return Student;
}
