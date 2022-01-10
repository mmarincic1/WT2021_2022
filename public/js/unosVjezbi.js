function dodajInputPolja() {
    var x = document.getElementById("unosZadataka");
    var y = document.getElementById("posaljiZadatke");
    x.style.display = "block";
    let brVj = parseFloat(document.getElementById("brojVjezbi").value);
    if (brVj != parseInt(brVj)) {
        x.style.display = "none";
        y.style.display = "none";
        console.log("Nevalidan broj vjezbi!");
    }
    else {

        if (document.getElementById("brojVjezbi").value <= 0) {
            x.style.display = "none";
        }

        VjezbeAjax.dodajInputPolja(document.getElementById("unosZadataka"), document.getElementById("brojVjezbi").value);
        y.style.display = "block";
        if (document.getElementById("brojVjezbi").value <= 0) {
            y.style.display = "none";
        }
    }
}

function posaljiZadatke() {
    var json = "{\"brojVjezbi\":" + document.getElementById("brojVjezbi").value + ",\"brojZadataka\":[";
    for (let i = 0; i < document.getElementById("brojVjezbi").value; i++) {
        if(parseFloat(document.getElementById("z" + i).value) != parseInt(document.getElementById("z" + i).value)){
            console.log("Pogrešan broj zadatka vjezbe " +(i+1));
            return;
        }
        json += document.getElementById("z" + i).value + ",";
    }
    json = json.substring(0, json.length - 1);
    json += "]}";
    VjezbeAjax.posaljiPodatke(JSON.parse(json), function (err, data) {
        if (err)
            console.log(err);
        else console.log(data);
    });
    window.location.reload(); // PITAJ TREBA LI OVO
}