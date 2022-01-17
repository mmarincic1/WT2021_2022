function dodajStudenta() {
    let greske = [];
    if (document.getElementById("ime").value.trim() == "")
        greske.push("ime");
    if (document.getElementById("prezime").value.trim() == "")
        greske.push("prezime");
    if (document.getElementById("index").value.trim() == "")
        greske.push("index");
    if (document.getElementById("grupa").value.trim() == "")
        greske.push("grupa");

    if (greske.length > 0) {
        document.getElementById("ajaxstatus").innerHTML = "Pogrešan parametar na formi " + greske.join(",") + "!";
    }
    else {
        var json = "{\"ime\":\"" + document.getElementById("ime").value + "\",\"prezime\":\"" +
            document.getElementById("prezime").value + "\",\"index\":\"" + document.getElementById("index").value
            + "\",\"grupa\":\"" + document.getElementById("grupa").value + "\"}";
        StudentAjax.dodajStudenta(JSON.parse(json), function (err, data) {
            if (err)
                document.getElementById("ajaxstatus").innerHTML = err;
            else document.getElementById("ajaxstatus").innerHTML = data['status'];
        });
    }

}