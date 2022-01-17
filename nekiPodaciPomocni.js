/*const db = require('./baza.js')
db.sequelize.sync({ force: true }).then(function () {
    inicializacija().then(function () {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicializacija() {
    var ListaPromisea1 = [];
    var ListaPromisea2 = [];
    return new Promise(function (resolve, reject) {
        ListaPromisea1.push(db.zadatak.create({}));
        ListaPromisea1.push(db.zadatak.create({}));
        ListaPromisea1.push(db.zadatak.create({}));
        ListaPromisea1.push(db.zadatak.create({}));
        Promise.all(ListaPromisea1).then(function (zadaci) {
            ListaPromisea2.push(
                db.vjezba.create({}).then(function(v){
                    return v.setVjezbaId([zadaci[0], zadaci[1], zadaci[2]]).then(function () {
                        return new Promise(function(resolve,reject){resolve(v);});  
                    })
                })
            );
            ListaPromisea2.push(
                db.vjezba.create({}).then(function(v){
                    return v.setVjezbaId([zadaci[3]]).then(function () {
                        return new Promise(function(resolve,reject){resolve(v);});  
                    })
                })
            );
            Promise.all(ListaPromisea2).catch(function (err) { console.log("Vjezbe greska " + err); });
        }).catch(function (err) { console.log("Zadaci greska " + err); });
    });
}*/