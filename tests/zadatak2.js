const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
let assert = chai.assert;

const server = require('../index.js');
const Sequelize = require('sequelize');
const db = require('../baza.js');


// prije izvršavanja testova spasimo porethodno zapisane podatke iz baze u pomocne
// poslije izvrsavanja ih vratimo u bazu

let Studenti = [];
let Grupe = [];
let Vjezbe = [];
let Zadaci = [];

describe('Testovi novih ruta', function () {
    this.timeout(100000);
    this.beforeAll(function (done) {
        db.sequelize.sync().then(function () {
            return db.student.findAll();
        }).then(function (studenti) {
            studenti.forEach(student => {
                Studenti.push({ ime: student.ime, prezime: student.prezime, index: student.index, grupa: student.grupa })
            });
            return db.grupa.findAll();
        }).then(function (grupe) {
            grupe.forEach(grupa => {
                Grupe.push({ naziv: grupa.naziv });
            })
            return db.zadatak.findAll();
        }).then(function (zadaci) {
            zadaci.forEach(zadatak => {
                Zadaci.push({ id: zadatak.id, vjezbaId: zadatak.VjezbaId })
            })
            return db.vjezba.findAll();
        }).then(function (vjezbe) {
            vjezbe.forEach(vjezba => {
                Vjezbe.push({ id: vjezba.id })
            })
            db.sequelize.sync({ force: true }).then(function () {
                done();
            })
        })
    });

    this.afterAll(function (done) {
        db.vjezba.bulkCreate(Vjezbe).then(function () {
            return db.zadatak.bulkCreate(Zadaci);
        }).then(function () {
            return db.grupa.bulkCreate(Grupe);
        }).then(function () {
            return db.student.bulkCreate(Studenti);
        }).then(function () {
            done();
        })
    });

    this.afterEach(function (done) {
        db.sequelize.sync({ force: true }).then(function () {
            done();
        })
    });

    describe('POST /student', function(){
        it('Pogrešni parametri', async function(){
            let student = {ime: '', prezime: '', index: '', grupa: ''};
            let odg = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student));
            assert.equal(JSON.parse(odg.text).status, "Pogrešan parametar ime,prezime,index,grupa!", "Nesto nije ok!");
            
            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 0, "Pogrešan broj studenata u bazi!");
            
            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 0, "Pogrešan broj grupa u bazi!");
        });

        it('Dodavanje jednog studenta', async function(){
            let student = {ime: 'Mara', prezime: 'Mara', index: '12345', grupa: 'G1'};
            let odg = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student));
            assert.equal(JSON.parse(odg.text).status, "Kreiran student!", "Nesto nije ok!");
            
            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 1, "Pogrešan broj studenata u bazi!");
            assert.equal(studenti[0].index, student.index, "Pogrešan index studenta!")
            assert.equal(studenti[0].ime, student.ime, "Pogrešno ime studenta!")
            assert.equal(studenti[0].prezime, student.prezime, "Pogrešno prezime studenta!")

            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 1, "Pogrešan broj grupa u bazi!");
            assert.equal(grupe[0].naziv, student.grupa, "Pogrešan naziv grupe u bazi!");
        });

        it('Dodavanje studenta koji već postoji u bazi', async function(){
            let student = {ime: 'Mara', prezime: 'Mara', index: '12345', grupa: 'G1'};
            let odg = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student));
            assert.equal(JSON.parse(odg.text).status, "Kreiran student!", "Nesto nije ok!");

            let odg1 = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student));
            assert.equal(JSON.parse(odg1.text).status, "Student sa indexom " + student.index + " već postoji!", "Nesto nije ok!");
            
            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 1, "Trebalo je da ostane samo jedan student u bazi!");
            assert.equal(studenti[0].index, student.index, "Pogrešan index studenta!")
            assert.equal(studenti[0].ime, student.ime, "Pogrešno ime studenta!")
            assert.equal(studenti[0].prezime, student.prezime, "Pogrešno prezime studenta!")

            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 1, "Pogrešan broj grupa u bazi!");
            assert.equal(grupe[0].naziv, student.grupa, "Pogrešan naziv grupe u bazi!");
        });

        it('Dodavanje dva studenta sa istom grupom', async function(){
            let student = {ime: 'Mara', prezime: 'Mara', index: '12345', grupa: 'G1'};
            let odg = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student));
            assert.equal(JSON.parse(odg.text).status, "Kreiran student!", "Nesto nije ok!");

            let student1 = {ime: 'Mara1', prezime: 'Mara1', index: '12346', grupa: 'G1'};
            let odg1 = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student1));
            assert.equal(JSON.parse(odg1.text).status, "Kreiran student!", "Nesto nije ok!");
            
            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 2, "Trebalo je da se ubace oba studenta u bazu!");
            assert.equal(studenti[0].index, student.index, "Pogrešan index studenta!")
            assert.equal(studenti[1].index, student1.index, "Pogrešan index studenta!")

            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 1, "Treba da ostane jedna grupa u bazi!");
            assert.equal(grupe[0].naziv, student.grupa, "Pogrešan naziv grupe u bazi!");
        });

        it('Dodavanje dva studenta sa različitom grupom grupom', async function(){
            let student = {ime: 'Mara', prezime: 'Mara', index: '12345', grupa: 'G1'};
            let odg = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student));
            assert.equal(JSON.parse(odg.text).status, "Kreiran student!", "Nesto nije ok!");

            let student1 = {ime: 'Mara1', prezime: 'Mara1', index: '12346', grupa: 'G2'};
            let odg1 = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student1));
            assert.equal(JSON.parse(odg1.text).status, "Kreiran student!", "Nesto nije ok!");
            
            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 2, "Trebalo je da se ubace oba studenta u bazu!");
            assert.equal(studenti[0].index, student.index, "Pogrešan index studenta!")
            assert.equal(studenti[1].index, student1.index, "Pogrešan index studenta!")

            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 2, "Treba da se naprave 2 grupe u bazi!");
            assert.equal(grupe[0].naziv, student.grupa, "Pogrešan naziv grupe u bazi!");
            assert.equal(grupe[1].naziv, student1.grupa, "Pogrešan naziv grupe u bazi!");
        });
    });

    describe('PUT /student/:index', function(){
        it('Pogrešni parametri', async function(){
            let odg = await chai.request(server)
                            .put('/student/123456')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify({grupa:''}));
            assert.equal(JSON.parse(odg.text).status, "Pogrešan parametar grupa!", "Nesto nije ok!");
        });

        it('Student sa indexom ne postoji', async function(){
            let odg = await chai.request(server)
                            .put('/student/1')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify({grupa:'G1'}));
            assert.equal(JSON.parse(odg.text).status, "Student sa indexom 1 ne postoji", "Nesto nije ok!");
        });

        it('Promjena grupe studentu ako grupa vec postoji', async function(){
            let student = {ime: 'Mara', prezime: 'Mara', index: '12345', grupa: 'G1'};
            let odg = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student));
            assert.equal(JSON.parse(odg.text).status, "Kreiran student!", "Nesto nije ok!");

            let student1 = {ime: 'Mara1', prezime: 'Mara1', index: '12346', grupa: 'G2'};
            let odg1 = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student1));
            assert.equal(JSON.parse(odg1.text).status, "Kreiran student!", "Nesto nije ok!");
    
            let odg2 = await chai.request(server)
                            .put('/student/12345')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify({grupa:'G2'}));
            assert.equal(JSON.parse(odg2.text).status, "Promjenjena grupa studentu " + student.index, "Nesto nije ok!");

            let studentBaza = await db.student.findAll({where:{index:'12345'}});
            assert.equal(studentBaza[0].grupa, "G2", "Nije promjenjena grupa studentu!");
            
            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 2, "Treba da ostanu dvije grupe u bazi!");
            assert.equal(grupe[0].naziv, student.grupa, "Pogrešan naziv grupe u bazi!");
            assert.equal(grupe[1].naziv, student1.grupa, "Pogrešan naziv grupe u bazi!");
        });

        it('Promjena grupe studentu ako grupa ne postoji', async function(){
            let student = {ime: 'Mara', prezime: 'Mara', index: '12345', grupa: 'G1'};
            let odg = await chai.request(server)
                            .post('/student')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify(student));
            assert.equal(JSON.parse(odg.text).status, "Kreiran student!", "Nesto nije ok!");
    
            let odg1 = await chai.request(server)
                            .put('/student/12345')
                            .set('Content-Type', 'application/json')
                            .send(JSON.stringify({grupa:'G2'}));
            assert.equal(JSON.parse(odg1.text).status, "Promjenjena grupa studentu " + student.index, "Nesto nije ok!");

            let studentBaza = await db.student.findAll({where:{index:'12345'}});
            assert.equal(studentBaza[0].grupa, "G2", "Nije promjenjena grupa studentu!");
            
            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 2, "Treba da budu dvije grupe u bazi!");
            assert.equal(grupe[0].naziv, student.grupa, "Pogrešan naziv grupe u bazi!");
            assert.equal(grupe[1].naziv, 'G2', "Pogrešan naziv grupe u bazi!");
        });
    });

    describe('POST /batch/student', function () {
        it('Prazan csv string', async function(){
            let csvPodaci = "";
            let odg = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci);
            assert.equal(JSON.parse(odg.text).status, "Pogrešan format csv podataka!", "Nesto nije ok!");
        });

        it('Pogrešan format csv 1', async function(){
            let csvPodaci = "Mara,Mara,123";
            let odg = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci);
            assert.equal(JSON.parse(odg.text).status, "Pogrešan format csv podataka!", "Nesto nije ok!");
        });

        it('Pogrešan format csv 2', async function(){
            let csvPodaci = "Mara,Mara,,G1";
            let odg = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci);
            assert.equal(JSON.parse(odg.text).status, "Pogrešan format csv podataka!", "Nesto nije ok!");
        });

        it('Dodani svi studenti', async function(){
            let csvPodaci = "Mara,Mara,1,G1\nMara1,Mara1,2,G2\nMara2,Mara2,3,G3";
            let odg = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci);
            assert.equal(JSON.parse(odg.text).status, "Dodano 3 studenata!", "Nesto nije ok!");

            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 3, "Trebalo je da se ubace tri studenta u bazu!");

            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 3, "Treba da se naprave 3 grupe u bazi!");
        });

        it('Dodani svi studenti ali ne i grupe', async function(){
            let csvPodaci = "Mara,Mara,1,G1\nMara1,Mara1,2,G2\nMara2,Mara2,3,G3";
            let odg = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci);
            assert.equal(JSON.parse(odg.text).status, "Dodano 3 studenata!", "Nesto nije ok!");

            let csvPodaci1 = "Mara3,Mara3,4,G1\nMara4,Mara4,5,G2\nMara5,Mara5,6,G3";
            let odg1 = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci1);
            assert.equal(JSON.parse(odg1.text).status, "Dodano 3 studenata!", "Nesto nije ok!");

            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 6, "Trebalo je da se ubace tri studenta u bazu!");

            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 3, "Treba da ostanu 3 grupe u bazi!");
        });

        it('Dodani svi studenti ali ne i grupe 2', async function(){
            let csvPodaci = "Mara,Mara,1,G1\nMara1,Mara1,2,G2\nMara2,Mara2,3,G3";
            let odg = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci);
            assert.equal(JSON.parse(odg.text).status, "Dodano 3 studenata!", "Nesto nije ok!");

            let csvPodaci1 = "Mara3,Mara3,4,G4\nMara4,Mara4,5,G4\nMara5,Mara5,6,G4";
            let odg1 = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci1);
            assert.equal(JSON.parse(odg1.text).status, "Dodano 3 studenata!", "Nesto nije ok!");

            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 6, "Trebalo je da se ubace šest studenata u bazu!");

            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 4, "Treba da se doda 4 grupe u bazu!");
        });

        it('Ponavljanje studenata', async function(){
            let csvPodaci = "Mara,Mara,1,G1\nMara1,Mara1,2,G2\nMara2,Mara2,1,G3";
            let odg = await chai.request(server)
                            .post('/batch/student')
                            .set('Content-Type', 'text/plain')
                            .send(csvPodaci);
            assert.equal(JSON.parse(odg.text).status, "Dodano 2 studenata, a studenti 1 već postoje!", "Nesto nije ok!");

            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 2, "Trebalo je da se ubace 2 studenta u bazu!");

            let grupe =  await db.grupa.findAll();
            assert.equal(grupe.length, 2, "Treba da se dodaju 2 grupe u bazu!");
        });

        it('Ponavljanje studenata 2', async function () {
            let csvPodaci = "Mara,Mara,1,G1\nMara1,Mara1,2,G2\nMara2,Mara2,3,G3";
            let odg = await chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(csvPodaci);
            assert.equal(JSON.parse(odg.text).status, "Dodano 3 studenata!", "Nesto nije ok!");
            let csvPodaci1 = "Mara3,Mara3,1,G4\nMara4,Mara4,2,G4\nMara5,Mara5,3,G4";
            let odg1 = await chai.request(server)
                .post('/batch/student')
                .set('Content-Type', 'text/plain')
                .send(csvPodaci1);
            assert.equal(JSON.parse(odg1.text).status, "Dodano 0 studenata, a studenti 1,2,3 već postoje!", "Nesto nije ok!");


            let studenti = await db.student.findAll();
            assert.equal(studenti.length, 3, "Trebalo je da se ubace 3 studenta u bazu!");

            let grupe = await db.grupa.findAll();
            assert.equal(grupe.length, 3, "Treba da se dodaju 3 grupe u bazu!");
        });



    });

});
