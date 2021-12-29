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

    const dohvatiPodatke = function (callbackFja) {
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost:3000/vjezbe", true);
        ajax.send();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.responseText.includes("error"))
                callbackFja(JSON.parse(ajax.responseText)['status'], null);
            else if (ajax.readyState == 4 && ajax.status == 200)
                callbackFja(null, ajax.responseText);
            else if (ajax.readyState == 4 && ajax.status == 404)
                callbackFja(JSON.parse(ajax.responseText)['status'], null);
        };
    }

    const iscrtajVjezbe = function (divDOMelement, jsonObjekat) {
        divDOMelement.innerHTML = "";
        let brojV = JSON.parse(jsonObjekat)['brojVjezbi'];
        for (let i = 0; i < brojV; i++) {
            let noviDiv = document.createElement('div');
            noviDiv.className = "vjezbaDiv"
            let noviBtn = document.createElement('button');
            noviBtn.id = "vjezba" + (i + 1);
            noviBtn.className = "vjezba";
            noviBtn.innerHTML = "VJEŽBA " + (i + 1);
            let brojZ = JSON.parse(jsonObjekat)['brojZadataka'][i];
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
        if (kliknuti.includes(divDOMelement)) {
            if( divDOMelement.style.display == 'block')
                divDOMelement.style.display = 'none';
            else  divDOMelement.style.display = 'block';
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

    return {
        dodajInputPolja: dodajInputPolja,
        posaljiPodatke: posaljiPodatke,
        dohvatiPodatke: dohvatiPodatke,
        iscrtajVjezbe: iscrtajVjezbe,
        iscrtajZadatke: iscrtajZadatke
    }
}());