function postaviStudente() {
    StudentAjax.dodajBatch(document.getElementById("csvString").value, function (err, data) {
        if(err)
        document.getElementById("ajaxstatus").innerHTML = err;     
        else document.getElementById("ajaxstatus").innerHTML = data['status'];
    });
}