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
    let pages = [];
    let currentpage;
    icecream.orders = [];
    icecream.sorts = ["Vanilla", "Chocolate", "Yoghurt", "Coconut", "Cookies", "Strawberry", "Raspberry", "Peanutbutter", "Salted Caramel", "Pistachio"];
    icecream.sauces = ["None", "Chocolate", "Strawberry", "Caramel"];
    icecream.toppings = ["Chocolate Chips", "Cookie Crumples", "Whipped Cream", "Strawberrys", "Smarties"];
    icecream.sortinputs = [];
    icecream.sauceinputs = [];
    icecream.toppinginputs = [];
    icecream.selectedsorts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    icecream.fieldsets = [];
    let sum;
    icecream.ordercount = -1;
    window.addEventListener("load", init);
    function init() {
        icecream.fieldsets[0] = document.getElementsByTagName("fieldset")[0];
        icecream.fieldsets[1] = document.getElementsByTagName("fieldset")[1];
        icecream.fieldsets[2] = document.getElementsByTagName("fieldset")[2];
        createPagesArray();
        document.getElementById("neworder").addEventListener("click", openConeorcup);
        document.getElementById("cone").addEventListener("click", chooseContainer);
        document.getElementById("cup").addEventListener("click", chooseContainer);
        document.getElementById("anotherorder").addEventListener("click", openConeorcup);
        document.getElementById("buy").addEventListener("click", nextPage);
        document.getElementById("commit").addEventListener("click", checkValidity);
    }
    function openConeorcup() {
        createNewOrder();
        currentpage = 0;
        pages[3].style.visibility = "hidden";
        nextPage();
    }
    function createNewOrder() {
        icecream.ordercount += 1;
        let order = { ordernumber: icecream.ordercount, container: "", scoops: [], sauce: "", toppings: "", price: 0 };
        icecream.orders.push(order);
    }
    function chooseContainer(_event) {
        let target = _event.target;
        if (target.id == "cone") {
            icecream.orders[icecream.ordercount].container = "Cone";
        }
        if (target.id == "cup") {
            icecream.orders[icecream.ordercount].container = "Cup";
        }
        openDecisions();
    }
    function openDecisions() {
        nextPage();
        document.getElementById("price").style.visibility = "visible";
        if (icecream.ordercount == 0) {
            icecream.createInputs();
        }
        document.getElementsByTagName("fieldset")[0].addEventListener("change", changeOrder);
        document.getElementsByTagName("fieldset")[1].addEventListener("change", changeOrder);
        document.getElementsByTagName("fieldset")[2].addEventListener("change", changeOrder);
    }
    function changeOrder() {
        let scoopprice = 0;
        let sauceprice;
        let toppingprice = 0;
        for (let i = 0; i < icecream.sortinputs.length; i++) {
            icecream.selectedsorts[i] = parseInt(icecream.sortinputs[i].value);
            scoopprice += icecream.selectedsorts[i];
        }
        for (let i = 0; i < icecream.sauceinputs.length; i++) {
            if (icecream.sauceinputs[i].checked) {
                icecream.orders[icecream.ordercount].sauce = icecream.sauces[i];
                if (icecream.sauceinputs[i].value == "None") {
                    sauceprice = 0;
                }
                else {
                    sauceprice = 0.5;
                }
            }
        }
        for (let i = 0; i < icecream.toppinginputs.length; i++) {
            if (icecream.toppinginputs[i].checked) {
                toppingprice += 1;
            }
        }
        let sum = (scoopprice + toppingprice + sauceprice);
        icecream.orders[icecream.ordercount].price = sum;
        updatePrice(scoopprice, sauceprice, toppingprice, sum);
    }
    function updatePrice(_scoopprice, _sauceprice, _toppingprice, _sum) {
        document.getElementById("scoopprice").innerText = _scoopprice + ".00€";
        document.getElementById("toppingprice").innerText = _toppingprice + ".00€";
        if (_sauceprice == 0) {
            document.getElementById("sauceprice").innerText = "0.00€";
            document.getElementById("sum").innerText = _sum + ".00€";
        }
        else {
            document.getElementById("sauceprice").innerText = _sauceprice + "0€";
            document.getElementById("sum").innerText = _sum + "0€";
        }
    }
    function openCart() {
        nextPage();
        document.getElementById("price").style.visibility = "hidden";
        saveOrder();
        createDiv(icecream.orders[icecream.ordercount]);
    }
    icecream.openCart = openCart;
    function createDiv(_order) {
        let scoopstring = "";
        for (let i = 0; i < _order.scoops.length; i++) {
            if (i > 0) {
                scoopstring += " / " + _order.scoops[i].name + ": " + _order.scoops[i].amount;
            }
            else {
                scoopstring += +_order.scoops[i].name + ": " + _order.scoops[i].amount;
            }
        }
        let div = document.createElement("div");
        let h = document.createElement("h1");
        h.innerText = "Order " + (_order.ordernumber + 1);
        div.appendChild(h);
        let coc = document.createElement("p");
        coc.innerText = "Container: " + _order.container;
        div.appendChild(coc);
        let scoop = document.createElement("p");
        scoop.innerText = "Scoops: " + scoopstring;
        div.appendChild(scoop);
        let sauce = document.createElement("p");
        sauce.innerText = "Sauce: " + _order.sauce;
        div.appendChild(sauce);
        let toppings = document.createElement("p");
        toppings.innerText = "Toppings: " + _order.toppings;
        div.appendChild(toppings);
        let price = document.createElement("p");
        if (this.sauce == "None") {
            price.innerText = "Price: " + _order.price + ".00€";
        }
        else {
            price.innerText = "Price: " + _order.price + "0€";
        }
        div.appendChild(price);
        document.getElementById("orders").appendChild(div);
    }
    function saveOrder() {
        let allscoops = "";
        let alltoppings = "";
        for (let i = 0; i < icecream.sortinputs.length; i++) {
            if (icecream.selectedsorts[i] > 0) {
                icecream.orders[icecream.ordercount].scoops.push({ name: icecream.sorts[i], amount: icecream.selectedsorts[i] });
            }
        }
        for (let i = 0; i < icecream.toppinginputs.length; i++) {
            if (icecream.toppinginputs[i].checked) {
                alltoppings += icecream.toppinginputs[i].value + ", ";
            }
        }
        icecream.orders[icecream.ordercount].toppings = alltoppings;
    }
    function checkValidity() {
        let firstname = document.getElementById("firstname");
        let lastname = document.getElementById("lastname");
        let email = document.getElementById("email");
        let street = document.getElementById("street");
        let streetnumber = document.getElementById("streetnumber");
        let postcode = document.getElementById("postcode");
        let notvalid = [];
        if (firstname.validity.valid != true)
            notvalid.push("Firstname");
        if (lastname.validity.valid != true)
            notvalid.push("Lastname");
        if (email.validity.valid != true)
            notvalid.push("Email");
        if (street.validity.valid != true)
            notvalid.push("Streetname");
        if (streetnumber.validity.valid != true)
            notvalid.push("Streetnumber");
        if (postcode.validity.valid != true)
            notvalid.push("Postcode");
        if (notvalid[0] == null) {
            nextPage();
        }
        else {
            alert("Your inputs on " + notvalid + " are not valid. Please check again!");
        }
        gotoServerPage();
    }
    function nextPage() {
        pages[currentpage].style.visibility = "hidden";
        pages[currentpage + 1].style.visibility = "visible";
        currentpage += 1;
    }
    function gotoServerPage() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8100", true);
        xhr.addEventListener("readystatechange", onStateChange);
        xhr.send(JSON.stringify(icecream.orders));
    }
    function onStateChange(_event) {
        let xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let div = document.getElementById("response");
            div.innerHTML = xhr.responseText;
        }
    }
    function createPagesArray() {
        pages[0] = document.getElementById("startpage");
        pages[1] = document.getElementById("coneorcup");
        pages[2] = document.getElementById("decisions");
        pages[3] = document.getElementById("cart");
        pages[4] = document.getElementById("data");
        pages[5] = document.getElementById("thanks");
    }
})(icecream || (icecream = {}));
//# sourceMappingURL=dynamik.js.map