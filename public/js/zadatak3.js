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
            assert.equal(2*2, brojPolja, 'Broj polja nije nula!');
        });
    });

    // OVDJE UBACI TESTOVE ZA POSALJI PODATKE I DOHVATI PODATKE !!!!
    describe('posaljiPodatke()', function () {
        it('test 1', function () {

        });
    });
    //
    describe('dohvatiPodatke()', function () {
        it('test 1', function () {
            
        });
    });
    // OVDJEEEEEE 

    describe('iscrtajVjezbe()', function () {
        it('BrojVjezbi < 0', function () {
            let div = document.getElementById("divZaTestove");
            // pogresan parametar brojVjezbi < 0
            let objekat = {brojVjezbi: -1, brojZadataka: [1,2,3,4,5]};

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('BrojVjezbi > 15', function () {
            let div = document.getElementById("divZaTestove");
            // pogresan parametar brojVjezbi > 16
            let objekat = {brojVjezbi: 16, brojZadataka: [1,2,3,4,5]};

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan broj zadataka', function () {
            let div = document.getElementById("divZaTestove");
            
            let objekat = {brojVjezbi: 5, brojZadataka: [1,2,3,4,5,6]};

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan neki od zadataka 1', function () {
            let div = document.getElementById("divZaTestove");
            
            let objekat = {brojVjezbi: 5, brojZadataka: [-1,2,3,4,5]};

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan neki od zadataka 2', function () {
            let div = document.getElementById("divZaTestove");
            
            let objekat = {brojVjezbi: 5, brojZadataka: [1,2,0,-4,5]};

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan neki od zadataka 3', function () {
            let div = document.getElementById("divZaTestove");
            
            let objekat = {brojVjezbi: 5, brojZadataka: [11,2,3,4,5]};

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Pogresan neki od zadataka 4', function () {
            let div = document.getElementById("divZaTestove");
            
            let objekat = {brojVjezbi: 5, brojZadataka: [1,2,3,10,15]};

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            // ukoliko je greska u podacima funckija ne radi nista !
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Broj vjezbi 0', function () {
            let div = document.getElementById("divZaTestove");
            
            let objekat = {brojVjezbi: 0, brojZadataka: []};

            VjezbeAjax.iscrtajVjezbe(div, objekat);
            
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(0, brojPolja, 'Broj vjezbi na formi nije nula!');
        });
        it('Broj vjezbi pozitivan 1', function () {
            let div = document.getElementById("divZaTestove");
            
            let objekat = {brojVjezbi: 2, brojZadataka: [1,2]};
            // 2 vjezbe moraju dodati 2 diva unutar kojeg se nalaze po jos jedan div za zadatke
            VjezbeAjax.iscrtajVjezbe(div, objekat);
            
            let brojPolja = div.children.length;
            div.innerHTML = '';
            assert.equal(2, brojPolja, 'Broj vjezbi na formi nije 2!');
        });
        it('Broj vjezbi pozitivan 2', function () {
            let div = document.getElementById("divZaTestove");
            
            let objekat = {brojVjezbi: 2, brojZadataka: [1,2]};
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
