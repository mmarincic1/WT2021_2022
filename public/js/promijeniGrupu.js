function postaviGrupu() {
    let greske = [];
    if (document.getElementById("index").value.trim() == "")
        greske.push("index");
    if (document.getElementById("grupa").value.trim() == "")
        greske.push("grupa");

    if (greske.length > 0) {
        document.getElementById("ajaxstatus").innerHTML = "Pogrešan parametar na formi " + greske.join(",") + "!";
    } else {
        StudentAjax.postaviGrupu(document.getElementById("index").value, document.getElementById("grupa").value, function (err, data) {
            if (err)
                document.getElementById("ajaxstatus").innerHTML = err;
            else document.getElementById("ajaxstatus").innerHTML = data['status'];
        });
    }
}