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

const db = require('./baza.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/vjezbe', function (req, res) {
    db.vjezba.findAll().then(function (vjezbe) {
        let brojVjezbi = vjezbe.length;
        let brojZadataka = [];
        db.zadatak.findAll().then(function (zadaci) {
            for(let i = 0; i < vjezbe.length; i++){
                let brojac = 0;
                for(let j = 0; j < zadaci.length; j++){
                    if(zadaci[j].VjezbaId == i+1)
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
                            vjezbeBaza[i].createVjezbaId({id:index, VjezbaId:i+1});
                            index++;
                        }
                    }
                    res.json(tijelo)
                })
            })
        })
    }
});

app.listen(3000);