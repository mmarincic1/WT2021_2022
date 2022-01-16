let StudentAjax = (function () {
    const dodajStudenta = function (objekatStudent, callBackfija) {
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/student", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(objekatStudent));
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200)
                callBackfija(null, JSON.parse(ajax.responseText));
            else if (ajax.readyState == 4 && ajax.status == 404)
                callBackfija("error", null);
        };
    }

    const postaviGrupu = function (index, grupa, callBackfija) {
        let ajax = new XMLHttpRequest();
        ajax.open("PUT", "http://localhost:3000/student/"+index, true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send("{\"grupa\":\"" + grupa + "\"}");
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200)
                callBackfija(null, JSON.parse(ajax.responseText));
            else if (ajax.readyState == 4 && ajax.status == 404)
                callBackfija("error", null);
        };
    }

    const dodajBatch = function (csvStudenti, callBackfija){
        let ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/batch/student", true);
        ajax.setRequestHeader("Content-Type", "text/plain; charset=UTF-8");
        ajax.send(csvStudenti);
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200)
                callBackfija(null, JSON.parse(ajax.responseText));
            else if (ajax.readyState == 4 && ajax.status == 404)
                callBackfija("error", null);
        };
    }

    return {
        dodajStudenta: dodajStudenta,
        postaviGrupu: postaviGrupu,
        dodajBatch: dodajBatch
    }
}());