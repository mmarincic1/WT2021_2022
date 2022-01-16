function postaviGrupu() {
    StudentAjax.postaviGrupu(document.getElementById("index").value, document.getElementById("grupa").value, function (err, data) {
        if(err)
        document.getElementById("ajaxstatus").innerHTML = err;     
        else document.getElementById("ajaxstatus").innerHTML = data['status'];
    });
}