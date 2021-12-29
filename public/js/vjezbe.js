function ucitajPodatke() {
    VjezbeAjax.dohvatiPodatke(function (err, data) {
        if(!err)
            VjezbeAjax.iscrtajVjezbe(document.getElementById("vjezbeTabela"), data);
    });
}