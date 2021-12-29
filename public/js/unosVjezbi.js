function dodajInputPolja(){
    var x = document.getElementById("unosZadataka");
    var y = document.getElementById("posaljiZadatke");
    x.style.display = "block";

    if(document.getElementById("brojVjezbi").value <= 0){
        x.style.display = "none";
    }
    
    VjezbeAjax.dodajInputPolja(document.getElementById("unosZadataka"), document.getElementById("brojVjezbi").value);
    y.style.display = "block";
    if(document.getElementById("brojVjezbi").value <= 0){
        y.style.display = "none";
    }
}

function posaljiZadatke(){
    var json = "{\"brojVjezbi\":" + document.getElementById("brojVjezbi").value + ",\"brojZadataka\":[";
    for(let i = 0; i < document.getElementById("brojVjezbi").value; i++){
        json+= document.getElementById("z" + i).value + ",";
    }
    json = json.substring(0, json.length-1);
    json+="]}";
    VjezbeAjax.posaljiPodatke(json, function (err, data) {
        if(err)
            console.log(err);
        else console.log(data);
    });
}
