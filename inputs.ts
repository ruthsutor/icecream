/*  
Aufgabe: Aufgabe 9
Name: Ruth Sutor
Matrikel: 254899
Datum: 29/05/2017
Hiermit versichere ich, dass ich diesen
Code selbst geschrieben habe. Er wurde
nicht kopiert und auch nicht diktiert.
*/
namespace icecream {
    export function createInputs(): void {
        for (let i: number = 0; i < sorts.length; i++) {
            createSortsInput(sorts[i]);
        }
        for (let i: number = 0; i < sauces.length; i++) {
            createSauceInput(sauces[i]);
        }
        for (let i: number = 0; i < toppings.length; i++) {
            createToppingsInput(toppings[i]);
        }
        let confirm: HTMLButtonElement = document.createElement("button");
        confirm.innerText = "CONFIRM";
        let decisions: HTMLElement = document.getElementById("decisions");
        confirm.id = "confirm";
        decisions.appendChild(confirm);
        confirm.addEventListener("click", openCart);
    }
    function createSortsInput(_sort: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");
        label.innerText = _sort;
        label.appendChild(input);
        input.type = "number";
        input.min = "0";
        input.value = "0";
        fieldsets[0].appendChild(label);
        sortinputs.push(input);
    }
    function createSauceInput(_sauce: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");
        label.innerText = _sauce;
        label.appendChild(input);
        input.type = "radio";
        input.name = "radiogroup";
        input.value = _sauce;
        if (_sauce == "None") {
            input.checked = true;
        }
        fieldsets[1].appendChild(label);
        sauceinputs.push(input);
    }
    function createToppingsInput(_topping: string): void {
        let label: HTMLLabelElement = document.createElement("label");
        let input: HTMLInputElement = document.createElement("input");
        label.innerText = _topping;
        label.appendChild(input);
        input.type = "checkbox";
        input.name = _topping;
        input.value = _topping;
        fieldsets[2].appendChild(label);
        toppinginputs.push(input);
    }
} 