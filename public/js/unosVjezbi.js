function dodajInputPolja(){
    var x = document.getElementById("unosZadataka");
    x.style.display = "block";

    if(document.getElementById("brojVjezbi").value == 0){
        x.style.display = "none";
    }
    
    VjezbeAjax.dodajInputPolja(document.getElementById("unosZadataka"), document.getElementById("brojVjezbi").value);
}