function postaviStudente() {
    if (document.getElementById("csvString").value.trim() == "") {
        document.getElementById("ajaxstatus").innerHTML = "Pogrešan unos csv podataka!";
    }
    else {
        StudentAjax.dodajBatch(document.getElementById("csvString").value, function (err, data) {
            if (err)
            document.getElementById("ajaxstatus").innerHTML = err;
            else document.getElementById("ajaxstatus").innerHTML = data['status'];
        });
    }

}