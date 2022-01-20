const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(express.static('public/html'))
app.use(express.static('public/css'))
app.use(express.static('public/js'))
app.use(express.static('public/images'))
app.use(express.static('public'))

const http = require('http');
const url = require('url');

const db = require('./baza.js');
const grupa = require('./models/grupa.js');
const student = require('./models/student.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

db.sequelize.sync();

app.get('/vjezbe', function (req, res) {
    db.vjezba.findAll().then(function (vjezbe) {
        let brojVjezbi = vjezbe.length;
        let brojZadataka = [];
        db.zadatak.findAll().then(function (zadaci) {
            for (let i = 0; i < vjezbe.length; i++) {
                let brojac = 0;
                for (let j = 0; j < zadaci.length; j++) {
                    if (zadaci[j].VjezbaId == i + 1)
                        brojac++;
                }
                brojZadataka.push(brojac);
            }
            const objekat = { brojVjezbi: brojVjezbi, brojZadataka: brojZadataka };
            res.json(objekat);
        })
    });
});

app.post('/vjezbe', function (req, res) {
    let tijelo = req.body;
    var zadaci = tijelo['brojZadataka'];
    var pogresniParametri = [];

    if (parseInt(tijelo['brojVjezbi']) < 1 || parseInt(tijelo['brojVjezbi']) > 15 ||
        (parseFloat(tijelo['brojVjezbi']) != parseInt(tijelo['brojVjezbi'])))
        pogresniParametri.push("brojVjezbi");

    for (let i = 0; i < zadaci.length; i++)
        if (zadaci.at(i) < 0 || zadaci.at(i) > 10 ||
            (parseInt(zadaci.at(i)) != parseFloat(zadaci.at(i))))
            pogresniParametri.push("z" + i);

    if (zadaci.length != parseFloat(tijelo['brojVjezbi']))
        pogresniParametri.push("brojZadataka");

    var greske = pogresniParametri.join();
    if (greske.length > 0)
        res.json({ status: "error", data: "Pogrešan parametar " + greske })
    else {
        // prvo brisemo iz baze
        db.zadatak.destroy({
            truncate: { cascade: true }
        }).then(function () {
            db.vjezba.destroy({
                truncate: { cascade: true }
            }).then(function () {
                let listaVjezbi = [];
                for (let i = 0; i < zadaci.length; i++) {
                    listaVjezbi.push({ id: i + 1 });
                }
                db.vjezba.bulkCreate(listaVjezbi).then(function (vjezbeBaza) {
                    let index = 1;
                    for (let i = 0; i < zadaci.length; i++) {
                        for (let j = 0; j < zadaci[i]; j++) {
                            vjezbeBaza[i].createVjezbaId({ id: index, VjezbaId: i + 1 });
                            index++;
                        }
                    }
                    res.json(tijelo)
                })
            })
        })
    }
});

app.post('/student', function (req, res) {
    let tijelo = req.body;
    // provjera ispravnosti podataka 
    let greske = [];
    if (tijelo['ime'].trim() == "")
        greske.push("ime");
    if (tijelo['prezime'].trim() == "")
        greske.push("prezime");
    if (tijelo['index'].trim() == "")
        greske.push("index");
    if (tijelo['grupa'].trim() == "")
        greske.push("grupa");

    if (greske.length > 0) {
        res.json({ status: "Pogrešan parametar " + greske.join(",") + "!" });
        return;
    }
    else {
        db.student.findAll({ where: { index: tijelo['index'] } }).then(function (studenti) {
            if (studenti.length > 0) {
                res.json({ status: "Student sa indexom " + tijelo['index'] + " već postoji!" });
                return;
            }
            // nema studenta pa ga dodaj u bazu
            else {
                db.student.create(tijelo).then(function (student) {
                    // napravili smo studenta sad moramo provjeriti da li ima grupe koja je poslana ukoliko nema i nju pravim
                    db.grupa.findAll({ where: { naziv: tijelo['grupa'] } }).then(function (grupe) {
                        if (grupe.length > 0) {
                            res.json({ status: "Kreiran student!" });
                            return;
                        }
                        // nema grupe moramo i nju napraviti
                        else {
                            db.grupa.create({ naziv: tijelo['grupa'] }).then(function (grupa) {
                                res.json({ status: "Kreiran student!" });
                                return;
                            })
                        }
                    })
                })
            }

        })
    }
});

app.put('/student/:index', function (req, res) {
    let tijelo = req.body;
    if (tijelo['grupa'].trim() == "")
        res.json({ status: "Pogrešan parametar grupa!" });
    else {
        db.student.findAll({ where: { index: req.params.index } }).then(function (student) {
            if (student.length > 0) { // student postoji, uvijek je jedan
                student[0].update({ grupa: tijelo['grupa'] }).then(function (uspjeh) {
                    // sada jos moramo provjeriti da li grupa postoji ili ne
                    db.grupa.findAll({ where: { naziv: tijelo['grupa'] } }).then(function (grupe) {
                        if (grupe.length > 0) {
                            res.json({ status: "Promjenjena grupa studentu " + req.params.index });
                            return;
                        }
                        // nema grupe moramo i nju napraviti
                        else {
                            db.grupa.create({ naziv: tijelo['grupa'] }).then(function (grupa) {
                                res.json({ status: "Promjenjena grupa studentu " + req.params.index });
                                return;
                            })
                        }
                    })
                })
            }
            else {
                res.json({ status: "Student sa indexom " + req.params.index + " ne postoji" });
                return;
            }
        })
    }
});

app.post('/batch/student', function (req, res) {
    let tijelo = req.body;
    // provjera podataka csva
    if(tijelo.trim() == ""){
        res.json({status: "Pogrešan format csv podataka!"});
        return;
    }
    let provjera = tijelo.split("\n");
    for(let i = 0; i < provjera.length; i++){
        let provjera1 = provjera[i].split(",");
        if(provjera1.length != 4){
            res.json({status: "Pogrešan format csv podataka!"});
            return;
        }
        for(let j = 0; j < 4; j++){
            if(provjera1[j].trim() == ""){
                res.json({status: "Pogrešan format csv podataka!"});
                return;
            }
        }
    }

    db.student.findAll().then(function (studentiBaza) {
        let studenti = tijelo.split("\n");
        let noviStudenti = [];
        let postojeciStudenti = [];
        for (let i = 0; i < studenti.length; i++) {
            // ime, prezime, index, grupa
            let postoji = 0;
            let osobine = studenti[i].split(",");
            for (let j = 0; j < studentiBaza.length; j++) {
                if (studentiBaza[j].index == osobine[2]) {
                    postoji = 1;
                    postojeciStudenti.push(osobine[2]);
                    break;
                }
            }
            if (!postoji) {
                // sada jos trebamo provjeriti da li se vec dodao novi student sa novim indexom
                // ovo je slusaj kada u csv se posalje vise studenata sa istim indexom
                let postojiNovi = 0;
                for (let k = 0; k < noviStudenti.length; k++) {
                    if (osobine[2] == noviStudenti[k].index) {
                        postojiNovi = 1;
                        break;
                    }
                }
                if (!postojiNovi)
                    noviStudenti.push({ ime: osobine[0], prezime: osobine[1], index: osobine[2], grupa: osobine[3] })
                else postojeciStudenti.push(osobine[2]);
            }
        }
        db.student.bulkCreate(noviStudenti).then(function (uspjeh) { // napravio sam studente
            db.grupa.findAll().then(function (grupeBaza) { // moram napraviti jos nove grupe koje su dodane
                let noveGrupe = [];
                for (let i = 0; i < noviStudenti.length; i++) {
                    let postoji = 0;

                    for (let j = 0; j < grupeBaza.length; j++) {
                        if (grupeBaza[j].naziv == noviStudenti[i].grupa) {
                            postoji = 1;
                            break;
                        }
                    }
                    if (!postoji) {
                        // i ovdje takodjer treba paziti da li se vec dodala ista grupa
                        let postojiNova = 0;
                        for (let k = 0; k < noveGrupe.length; k++) {
                            if (noviStudenti[i].grupa == noveGrupe[k].naziv) {
                                postojiNova = 1;
                                break;
                            }
                        }
                        if (!postojiNova)
                            noveGrupe.push({ naziv: noviStudenti[i].grupa });
                    }


                }

                db.grupa.bulkCreate(noveGrupe).then(function (uspjeh) {
                    if (postojeciStudenti.length > 0) {
                        let m = noviStudenti.length;
                        postojeciString = postojeciStudenti.join(",");
                        res.json({ status: "Dodano " + m + " studenata, a studenti " + postojeciString + " već postoje!" });
                    }
                    else {
                        res.json({ status: "Dodano " + studenti.length + " studenata!" });
                    }
                    return;
                })
            })
        })
    })
})

let exportVar = app.listen(3000);

module.exports = exportVar;