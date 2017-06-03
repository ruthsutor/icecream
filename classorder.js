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
    class Order {
        constructor() {
            this.ordernumber = icecream.ordercount;
            this.container = "";
            this.scoops = "";
            this.sauce = "";
            this.toppings = "";
            this.price = 0;
        }
        createDiv() {
            let div = document.createElement("div");
            let h = document.createElement("h1");
            h.innerText = "Order " + (this.ordernumber + 1);
            div.appendChild(h);
            let coc = document.createElement("p");
            coc.innerText = "Container: " + this.container;
            div.appendChild(coc);
            let scoop = document.createElement("p");
            scoop.innerText = "Scoops: " + this.scoops;
            div.appendChild(scoop);
            let sauce = document.createElement("p");
            sauce.innerText = "Sauce: " + this.sauce;
            div.appendChild(sauce);
            let toppings = document.createElement("p");
            toppings.innerText = "Toppings: " + this.toppings;
            div.appendChild(toppings);
            let price = document.createElement("p");
            if (this.sauce == "None") {
                price.innerText = "Price: " + this.price + ".00€";
            }
            else {
                price.innerText = "Price: " + this.price + "0€";
            }
            div.appendChild(price);
            document.getElementById("orders").appendChild(div);
        }
    }
    icecream.Order = Order;
})(icecream || (icecream = {}));
//# sourceMappingURL=classorder.js.map