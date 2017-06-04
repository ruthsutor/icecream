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
    function createInputs() {
        for (let i = 0; i < icecream.sorts.length; i++) {
            createSortsInput(icecream.sorts[i]);
        }
        for (let i = 0; i < icecream.sauces.length; i++) {
            createSauceInput(icecream.sauces[i]);
        }
        for (let i = 0; i < icecream.toppings.length; i++) {
            createToppingsInput(icecream.toppings[i]);
        }
        document.getElementById("confirm").addEventListener("click", icecream.openCart);
    }
    icecream.createInputs = createInputs;
    function createSortsInput(_sort) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerText = _sort;
        label.appendChild(input);
        input.type = "number";
        input.min = "0";
        input.value = "0";
        icecream.fieldsets[0].appendChild(label);
        icecream.sortinputs.push(input);
    }
    function createSauceInput(_sauce) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerText = _sauce;
        label.appendChild(input);
        input.type = "radio";
        input.name = "radiogroup";
        input.value = _sauce;
        if (_sauce == "None") {
            input.checked = true;
        }
        icecream.fieldsets[1].appendChild(label);
        icecream.sauceinputs.push(input);
    }
    function createToppingsInput(_topping) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        label.innerText = _topping;
        label.appendChild(input);
        input.type = "checkbox";
        input.name = _topping;
        input.value = _topping;
        icecream.fieldsets[2].appendChild(label);
        icecream.toppinginputs.push(input);
    }
})(icecream || (icecream = {}));
//# sourceMappingURL=inputs.js.map