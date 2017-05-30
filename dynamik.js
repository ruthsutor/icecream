/*
Aufgabe: Aufgabe 9
Name: Ruth Sutor
Matrikel: 254899
Datum: 29/05/2017
Hiermit versichere ich, dass ich diesen
Code selbst geschrieben habe. Er wurde
nicht kopiert und auch nicht diktiert.
*/
var icecream;
(function (icecream) {
    let startpage = document.getElementById("startpage");
    document.getElementById("neworder").addEventListener("click", openConeorcup);
    function openConeorcup() {
        startpage.style.visibility = "hidden";
    }
})(icecream || (icecream = {}));
//# sourceMappingURL=dynamik.js.map