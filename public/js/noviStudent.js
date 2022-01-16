function dodajStudenta() {
    var json = "{\"ime\":\"" + document.getElementById("ime").value + "\",\"prezime\":\"" + 
    document.getElementById("prezime").value + "\",\"index\":\"" + document.getElementById("index").value 
    + "\",\"grupa\":\"" + document.getElementById("grupa").value + "\"}";
    StudentAjax.dodajStudenta(JSON.parse(json), function (err, data) {
        if(err)
        document.getElementById("ajaxstatus").innerHTML = err;     
        else document.getElementById("ajaxstatus").innerHTML = data['status'];
    });
}