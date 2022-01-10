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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/vjezbe', function (req, res) {
    fs.readFile('vjezbe.csv', 'utf-8', function (err, buffer) {
        if (err)
            throw err;
        var vjezbe = buffer.toString('utf-8');
        var redovi = vjezbe.split(" ");
        if (redovi.length != 2) { // uvijek mora biti 2 reda u mom stilu formatiranja
            res.json({ brojVjezbi: null, brojZadataka: [null] });
        }
        else {
            var zadaci = redovi[1].split(",");
            var brojVjezbi = parseInt(redovi.at(0));
            var zadaciVjezbi = [];
            for (let i = 0; i < zadaci.length; i++) {
                zadaciVjezbi.push(parseFloat(zadaci.at(i).trim()));
            }
            const objekat = { brojVjezbi: brojVjezbi, brojZadataka: zadaciVjezbi };
            res.json(objekat);
        }
    });
});

app.post('/vjezbe', function (req, res) {
    let tijelo = req.body;
    var zadaci = tijelo['brojZadataka'];
    var pogresniParametri = [];

    if (parseInt(tijelo['brojVjezbi']) < 1 || parseInt(tijelo['brojVjezbi']) > 15)
        pogresniParametri.push("brojVjezbi");

    for (let i = 0; i < zadaci.length; i++)
        if (zadaci.at(i) < 0 || zadaci.at(i) > 10 ||
            (parseInt(zadaci.at(i)) != parseFloat(zadaci.at(i))))
            pogresniParametri.push("z" + i);

    if (zadaci.length != parseInt(tijelo['brojVjezbi']))
        pogresniParametri.push("brojZadataka");

    var greske = pogresniParametri.join();
    if (greske.length > 0)
        res.json({ status: "error", data: "Pogrešan parametar " + greske })
    else {
        let novaLinija = tijelo['brojVjezbi'] + " " + tijelo['brojZadataka'];
        fs.writeFile('vjezbe.csv', novaLinija, function (err) {
            if (err) throw err;
            res.json(req.body);
        });
    }
});

app.listen(3000);