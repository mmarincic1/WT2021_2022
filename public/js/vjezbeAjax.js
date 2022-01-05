let VjezbeAjax = (function () {
    const dodajInputPolja = function (DOMelementDIVauFormi, brojVjezbi) {
        var noveLabele = "";
        for (let i = 0; i < brojVjezbi; i++) {
            noveLabele += "<label for=z" + i + ">Broj zadataka za Vježbu " + (i + 1) + ":</label><input type=\"text\" id=z" + i + " class=\"inputText\" value=4 name=z" + i + ">"
        }
        DOMelementDIVauFormi.innerHTML = noveLabele;
    }

    const posaljiPodatke = function (vjezbeObjekat, callbackFja) {
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/vjezbe", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(vjezbeObjekat);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.responseText.includes("error"))
                callbackFja(JSON.parse(ajax.responseText)['data'], null);
            else if (ajax.readyState == 4 && ajax.status == 200)
                callbackFja(null, vjezbeObjekat);
        };
    }

    // ovdje mozda treba dodati provjeru ispravnosti response??
    const dohvatiPodatke = function (callbackFja) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost:3000/vjezbe", true);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.responseText.includes("error"))
                callbackFja("error", null);
            else if (ajax.readyState == 4 && ajax.status == 200) {
                let objekat = JSON.parse(ajax.responseText);
                var pogresniParametri = [];
                if (JSON.parse(ajax.responseText)['brojVjezbi'] > 15 || JSON.parse(ajax.responseText)['brojVjezbi'] < 0)
                    pogresniParametri.push("brojVjezbi");
                let zadaci = JSON.parse(ajax.responseText)['brojZadataka'];
                for (let i = 0; i < zadaci.length; i++)
                    if (zadaci.at(i) < 0 || zadaci.at(i) > 10)
                        pogresniParametri.push("z" + i);

                if (zadaci.length != JSON.parse(ajax.responseText)['brojVjezbi'])
                    pogresniParametri.push("brojZadataka");

                var greske = pogresniParametri.join();
                if (greske.length > 0) {
                    callbackFja("Pogrešan parametar " + greske, null);
                } else {
                    callbackFja(null, objekat);
                }
            }
            else if (ajax.readyState == 4 && ajax.status == 404)
                callbackFja("error", null);
        };
    }

    const iscrtajVjezbe = function (divDOMelement, jsonObjekat) {
        // dodao sam i ovdje provjeru za svaki slucaj
        let error = false;
        if (jsonObjekat['brojVjezbi'] > 15 || jsonObjekat['brojVjezbi'] < 0)
            error = true;
        let zadaci = jsonObjekat['brojZadataka'];
        for (let i = 0; i < zadaci.length; i++)
            if (zadaci.at(i) < 0 || zadaci.at(i) > 10) {
                error = true;
                break;
            }
        if (error)
            return;
        // kraj provjere    
        divDOMelement.innerHTML = "";
        brojV = jsonObjekat['brojVjezbi'];
        for (let i = 0; i < brojV; i++) {
            let noviDiv = document.createElement('div');
            noviDiv.className = "vjezbaDiv"
            let noviBtn = document.createElement('button');
            noviBtn.id = "vjezba" + (i + 1);
            noviBtn.className = "vjezba";
            noviBtn.innerHTML = "VJEŽBA " + (i + 1);
            let brojZ = jsonObjekat['brojZadataka'][i];
            let noviDivZadaci = document.createElement('div');
            noviDivZadaci.className = "zadaci";
            noviBtn.addEventListener('click', function () {
                iscrtajZadatke(noviDivZadaci, brojZ)
            });
            noviDiv.appendChild(noviBtn);
            noviDiv.appendChild(noviDivZadaci);
            divDOMelement.appendChild(noviDiv);
        }
    }

    var kliknuti = [];

    const iscrtajZadatke = function (divDOMelement, brojZadataka) {
        // dodao provjeru parametra brojZadataka
        if (brojZadataka >= 0 && brojZadataka <= 10) {
            if (kliknuti.includes(divDOMelement)) {
                if (divDOMelement.style.display == 'block')
                    divDOMelement.style.display = 'none';
                else divDOMelement.style.display = 'block';
            }
            else {
                kliknuti.push(divDOMelement);
                for (let i = 0; i < brojZadataka; i++) {
                    let noviBtn = document.createElement('button');
                    noviBtn.innerHTML = "ZADATAK " + (i + 1);
                    noviBtn.id = "zadaciBtn";
                    divDOMelement.appendChild(noviBtn);
                }
                divDOMelement.style.display = 'block';
            }
            for (let i = 0; i < kliknuti.length; i++)
                if (kliknuti.at(i) != divDOMelement)
                    kliknuti.at(i).style.display = "none";
        }
    }

    return {
        dodajInputPolja: dodajInputPolja,
        posaljiPodatke: posaljiPodatke,
        dohvatiPodatke: dohvatiPodatke,
        iscrtajVjezbe: iscrtajVjezbe,
        iscrtajZadatke: iscrtajZadatke
    }
}());