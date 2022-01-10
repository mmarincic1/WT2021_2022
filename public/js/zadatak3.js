let assert = chai.assert;
describe('VjezbeAjax', function () {
    describe('dodajInputPolja()', function () {
        it('Broj input polja 0', function () {
            let div = document.getElementById("divZaTestove");
            VjezbeAjax.dodajInputPolja(div, 0);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj polja nije nula!');
        });
        it('Broj input polja pozitivan', function () {
            let div = document.getElementById("divZaTestove");
            VjezbeAjax.dodajInputPolja(div, 2);
            let brojPolja = div.children.length;
            div.innerHTML = '';
            // rezultat ce biti 4 jer smo dodali i labelu prije svakog polja za unos
            assert.equal(2 * 2, brojPolja, 'Broj polja nije nula!');
        });
    });


    chai.should();
    describe('posaljiPodatke()', function () {
        beforeEach(function () {
            this.xhr = sinon.useFakeXMLHttpRequest();

            this.requests = [];
            this.xhr.onCreate = function (xhr) {
                this.requests.push(xhr);
            }.bind(this);
        });

        afterEach(function () {
            this.xhr.restore();
        });
        it('Ispravni podaci 1', function (done) {
            let data1 = { "brojVjezbi": 2, "brojZadataka": [1, 2] };
            let dataJson = JSON.stringify(data1);
            VjezbeAjax.posaljiPodatke(data1, function (err, data) {
                assert.equal(err, null, 'Podaci su ispravni!');
                assert.deepEqual(data, { "brojVjezbi": 2, "brojZadataka": [1, 2] });
                done();
            });
            //this.requests[0].requestBody.should.equal(data1);
            this.requests[0].requestBody.should.equal(dataJson);
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
        });
        it('Ispravni podaci 2', function (done) {
            let data1 = { "brojVjezbi": 1, "brojZadataka": [5] };
            let dataJson = JSON.stringify(data1);
            VjezbeAjax.posaljiPodatke(data1, function (err, data) {
                assert.equal(err, null, 'Podaci su ispravni!');
                assert.deepEqual(data, { "brojVjezbi": 1, "brojZadataka": [5] });
                done();
            });
            //this.requests[0].requestBody.should.equal(data1);
            this.requests[0].requestBody.should.equal(dataJson);
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
        });
        it('Neispravni podaci 1', function (done) {
            let data1 = { "brojVjezbi": -1, "brojZadataka": [] };
            let data2 = { status: "error", data: "Pogrešan podatak brojVjezbi,brojZadataka" };
            let dataJson = JSON.stringify(data2);
            let dataJson1 = JSON.stringify(data1);
            VjezbeAjax.posaljiPodatke(data1, function (err, data) {
                assert.equal(err, 'Pogrešan podatak brojVjezbi,brojZadataka', 'Podaci nisu ispravni!');
                assert.deepEqual(data, null, 'Podaci nisu ispravni!');
                done();
            });
            //this.requests[0].requestBody.should.equal(data1);
            this.requests[0].requestBody.should.equal(dataJson1);
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
        });
        it('Neispravni podaci 2', function (done) {
            let data1 = { "brojVjezbi": 5, "brojZadataka": [1, 2, 3, -4, 5] };
            let data2 = { status: "error", data: "Pogrešan podatak z3" };
            let dataJson = JSON.stringify(data2);
            let dataJson1 = JSON.stringify(data1);
            VjezbeAjax.posaljiPodatke(data1, function (err, data) {
                assert.equal(err, 'Pogrešan podatak z3', 'Podaci nisu ispravni!');
                assert.deepEqual(data, null, 'Podaci nisu ispravni!');
                done();
            });
            //this.requests[0].requestBody.should.equal(data1);
            this.requests[0].requestBody.should.equal(dataJson1);
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, dataJson);
        });
        it('Neka greska', function (done) {
            let data1 = {};
            VjezbeAjax.posaljiPodatke(data1, function (err, data) {
                assert.equal(err, "error", 'Desio se neki error!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(404, { 'Content-Type': 'text/json' }, '{"data": "error"}');
        });
    });
    //
    describe('dohvatiPodatke()', function () {
        beforeEach(function () {
            this.xhr = sinon.useFakeXMLHttpRequest();

            this.requests = [];
            this.xhr.onCreate = function (xhr) {
                this.requests.push(xhr);
            }.bind(this);
        });

        afterEach(function () {
            this.xhr.restore();
        });
        it('Neka greska 1', function (done) {
            let data1 = { status: 404, data: "error" };
            let dataJson = JSON.stringify(data1);
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "error", 'Desio se neki error!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(404, { 'Content-Type': 'text/json' }, dataJson);
        });
        it('Neka greska 2', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "error", 'Desio se neki error!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(404, { 'Content-Type': 'text/json' }, '{"data":"nekiError"}');
        });
        it('Pogresni podaci 1', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar brojVjezbi,brojZadataka", 'Pogresni podaci!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{"brojVjezbi": -1, "brojZadataka":[]}');
        });
        it('Pogresni podaci 2', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar brojVjezbi,brojZadataka", 'Pogresni podaci!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{"brojVjezbi": 16, "brojZadataka":[]}');
        });
        it('Pogresni podaci 3', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar z1", 'Pogresni podaci!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{"brojVjezbi": 2, "brojZadataka":[1,-2]}');
        });
        it('Pogresni podaci 4', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar brojZadataka", 'Pogresni podaci!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{"brojVjezbi": 5, "brojZadataka":[1,2,3,4,5,6]}');
        });
        it('Pogresni podaci 5', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar brojVjezbi,z1,z2,brojZadataka", 'Pogresni podaci!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{"brojVjezbi": null, "brojZadataka":[1,2.5,3.1,4,5,6]}');
        });
        it('Pogresni podaci 6', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, "Pogrešan parametar brojVjezbi,brojZadataka", 'Pogresni podaci!');
                assert.deepEqual(data, null);
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{"brojVjezbi": 5.5, "brojZadataka":[1,2,3,4,5]}');
        });
        it('Ispravni podaci 1', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, null, 'Nisu pogresni podaci!');
                assert.deepEqual(data, { "brojVjezbi": 5, "brojZadataka": [1, 2, 3, 4, 5] });
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{"brojVjezbi": 5, "brojZadataka":[1,2,3,4,5]}');
        });
        it('Ispravni podaci 2', function (done) {
            VjezbeAjax.dohvatiPodatke(function (err, data) {
                assert.equal(err, null, 'Nisu pogresni podaci!');
                assert.deepEqual(data, { "brojVjezbi": 8, "brojZadataka": [1, 2, 3, 4, 5, 6, 7, 8] });
                done();
            });
            this.requests[0].respond(200, { 'Content-Type': 'text/json' }, '{"brojVjezbi": 8, "brojZadataka":[1,2,3,4,5,6,7,8]}');
        });
    });


    describe('iscrtajVjezbe()', function () {
        it('BrojVjezbi < 0', function () {
            let div = document.getElementById("divZaTestove");
            // pogresan parametar brojVjezbi < 0
            let objekat = { brojVjezbi: -1, brojZadataka: [1, 2, 3, 4, 5] };

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('BrojVjezbi > 15', function () {
            let div = document.getElementById("divZaTestove");
            // pogresan parametar brojVjezbi > 16
            let objekat = { brojVjezbi: 16, brojZadataka: [1, 2, 3, 4, 5] };

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan broj zadataka', function () {
            let div = document.getElementById("divZaTestove");

            let objekat = { brojVjezbi: 5, brojZadataka: [1, 2, 3, 4, 5, 6] };

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan neki od zadataka 1', function () {
            let div = document.getElementById("divZaTestove");

            let objekat = { brojVjezbi: 5, brojZadataka: [-1, 2, 3, 4, 5] };

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan neki od zadataka 2', function () {
            let div = document.getElementById("divZaTestove");

            let objekat = { brojVjezbi: 5, brojZadataka: [1, 2, 0, -4, 5] };

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan neki od zadataka 3', function () {
            let div = document.getElementById("divZaTestove");

            let objekat = { brojVjezbi: 5, brojZadataka: [11, 2, 3, 4, 5] };

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan neki od zadataka 4', function () {
            let div = document.getElementById("divZaTestove");

            let objekat = { brojVjezbi: 5, brojZadataka: [1, 2, 3, 10, 15] };

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Broj vjezbi 0', function () {
            let div = document.getElementById("divZaTestove");

            let objekat = { brojVjezbi: 0, brojZadataka: [] };

            VjezbeAjax.iscrtajVjezbe(div, objekat);

            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Broj vjezbi pozitivan 1', function () {
            let div = document.getElementById("divZaTestove");

            let objekat = { brojVjezbi: 2, brojZadataka: [1, 2] };
            // 2 vjezbe moraju dodati 2 diva unutar kojeg se nalaze po jos jedan div za zadatke
            VjezbeAjax.iscrtajVjezbe(div, objekat);

            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(2, brojPolja, 'Broj vjezbi na formi nije 2!');
        });
        it('Broj vjezbi pozitivan 2', function () {
            let div = document.getElementById("divZaTestove");

            let objekat = { brojVjezbi: 2, brojZadataka: [1, 2] };
            // 2 vjezbe moraju dodati 2 diva unutar kojeg se nalaze po jos jedan div za zadatke
            VjezbeAjax.iscrtajVjezbe(div, objekat);

            let divic = div.children[0].children.length;
            div.innerHTML = '';
            // provjera da li se u jednom djecijem divu dodalo jedno dugme i jedan div za zadatke
            assert.equal(2, divic, 'Dugme i div za zadatke su jedini bi trebali biti jedini na formi!');
        });
    });

    describe('iscrtajZadatke()', function () {
        it('BrojZadataka < 0', function () {
            let div = document.getElementById("divZaTestove");
            // broj zadataka < 0

            VjezbeAjax.iscrtajZadatke(div, -1);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('BrojZadataka > 10', function () {
            let div = document.getElementById("divZaTestove");
            // broj zadataka > 10

            VjezbeAjax.iscrtajZadatke(div, 11);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        // moram svaki put praviti novi div !
        it('Pravilan broj zadataka 1', function () {
            let div = document.createElement('div');

            VjezbeAjax.iscrtajZadatke(div, 3);
            // 3 zadatka 3 dugmeta znaci 3 djeteta
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(3, brojPolja, 'Broj zadataka na formi nije 3!');
        });
        it('Pravilan broj zadataka 2', function () {
            let div = document.createElement('div');

            VjezbeAjax.iscrtajZadatke(div, 5);
            // 5 zadataka 5 dugmadi 5 djece
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(5, brojPolja, 'Broj zadataka na formi nije 5!');
        });
        it('Pravilan broj zadataka 3', function () {
            let div = document.createElement('div');

            VjezbeAjax.iscrtajZadatke(div, 0);
            // 0 zadatka 0 djece
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj zadataka na formi nije 0!');
        });
        it('Pravilan broj zadataka 4 - da li je vidljiv prijasnji?', function () {
            let div = document.createElement('div');
            let div1 = document.createElement('div');

            VjezbeAjax.iscrtajZadatke(div, 2);
            VjezbeAjax.iscrtajZadatke(div1, 3);
            // ukoliko se pozove funkcija 2 puta zaredom prvi div nece biti vidljiv
            let brojPolja = div.children.length;
            div.innerHTML = '';
            div1.innerHTML = '';
            assert.equal('none', div.style.display, 'Vidljivi zadaci koji bi trebali biti skriveni!');
        });
        it('Pravilan broj zadataka 5 - dva klika na isti', function () {
            let div = document.createElement('div');

            VjezbeAjax.iscrtajZadatke(div, 2);
            let brojPolja = div.children.length;
            assert.equal(2, brojPolja, 'Broj zadataka nije 2!');
            VjezbeAjax.iscrtajZadatke(div, 2);
            // ukoliko se pozove funkcija 2 puta zaredom div ne bi trebao biti vidljiv ali bi trebao imati 2 djece
            // i prije i poslije !!
            brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal('none', div.style.display, 'Vidljivi zadaci koji bi trebali biti skriveni!');
            assert.equal(2, brojPolja, 'Broj zadataka nije 2!');
        });
        // sada su svi moguci slucajevi testirani! :)
    });
});
