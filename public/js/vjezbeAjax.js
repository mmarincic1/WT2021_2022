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
                callbackFja(ajax.responseText, null);
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
                callbackFja(ajax.responseText, null);
            else if (ajax.readyState == 4 && ajax.status == 200)
                callbackFja(null, ajax.responseText);
            else if (ajax.readyState == 4 && ajax.status == 404)
                callbackFja(ajax.responseText, null);
        };
    }

    return {
        dodajInputPolja: dodajInputPolja,
        posaljiPodatke: posaljiPodatke,
        dohvatiPodatke: dohvatiPodatke
    }
}());