let VjezbeAjax = (function () {
    const dodajInputPolja = function (DOMelementDIVauFormi, brojVjezbi) {
        var noveLabele = "";
        for(let i = 0; i < brojVjezbi; i++){
            noveLabele += "<label for=z"+ i +">Broj zadataka:</label><input type=\"text\" id=z"+ i +" class=\"inputText\" value=4 name=z" + i + ">"
        }
        DOMelementDIVauFormi.innerHTML = noveLabele;
    }


    return {
        dodajInputPolja : dodajInputPolja
    }
}());