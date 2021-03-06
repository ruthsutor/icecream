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
    let pages: HTMLElement[] = [];
    let currentpage: number;
    export let orders: Order[] = [];
    export let sorts: string[] = ["Vanilla", "Chocolate", "Yoghurt", "Coconut", "Cookies", "Strawberry", "Raspberry", "Peanutbutter", "Salted Caramel", "Pistachio"];
    export let sauces: string[] = ["None", "Chocolate", "Strawberry", "Caramel"];
    export let toppings: string[] = ["Chocolate Chips", "Cookie Crumples", "Whipped Cream", "Strawberrys", "Smarties"];
    export let sortinputs: HTMLInputElement[] = [];
    export let sauceinputs: HTMLInputElement[] = [];
    export let toppinginputs: HTMLInputElement[] = [];
    export let selectedsorts: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    export let fieldsets: HTMLFieldSetElement[] = [];
    let sum: number;
    export let ordercount: number = -1;
    window.addEventListener("load", init);
    function init(): void {
        fieldsets[0] = document.getElementsByTagName("fieldset")[0];
        fieldsets[1] = document.getElementsByTagName("fieldset")[1];
        fieldsets[2] = document.getElementsByTagName("fieldset")[2];
        createPagesArray();

        document.getElementById("neworder").addEventListener("click", openConeorcup);
        document.getElementById("cone").addEventListener("click", chooseContainer);
        document.getElementById("cup").addEventListener("click", chooseContainer);
        document.getElementById("anotherorder").addEventListener("click", openConeorcup);
        document.getElementById("buy").addEventListener("click", nextPage);
        document.getElementById("commit").addEventListener("click", checkValidity);
    }
    function openConeorcup(): void {
        createNewOrder();
        currentpage = 0;
        pages[3].style.visibility = "hidden";
        nextPage();
    }
    function createNewOrder(): void {
        ordercount += 1;
        let order: Order = { ordernumber: ordercount, container: "", scoops: [], sauce: "", toppings: "", price: 0 };
        orders.push(order);
    }
    function chooseContainer(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        if (target.id == "cone") {
            orders[ordercount].container = "Cone";
        }
        if (target.id == "cup") {
            orders[ordercount].container = "Cup";
        }
        openDecisions();
    }
    function openDecisions(): void {
        nextPage();
        document.getElementById("price").style.visibility = "visible";
        if (ordercount == 0) {
            createInputs();
        }
        document.getElementsByTagName("fieldset")[0].addEventListener("change", changeOrder);
        document.getElementsByTagName("fieldset")[1].addEventListener("change", changeOrder);
        document.getElementsByTagName("fieldset")[2].addEventListener("change", changeOrder);
    }

    function changeOrder(): void {
        let scoopprice: number = 0;
        let sauceprice: number;
        let toppingprice: number = 0;
        for (let i: number = 0; i < sortinputs.length; i++) {
            selectedsorts[i] = parseInt(sortinputs[i].value);
            scoopprice += selectedsorts[i];
        }
        for (let i: number = 0; i < sauceinputs.length; i++) {
            if (sauceinputs[i].checked) {
                orders[ordercount].sauce = sauces[i];
                if (sauceinputs[i].value == "None") {
                    sauceprice = 0;
                }
                else {
                    sauceprice = 0.5;
                }
            }
        }
        for (let i: number = 0; i < toppinginputs.length; i++) {
            if (toppinginputs[i].checked) {
                toppingprice += 1;
            }
        }
        let sum: number = (scoopprice + toppingprice + sauceprice);
        orders[ordercount].price = sum;
        updatePrice(scoopprice, sauceprice, toppingprice, sum);
    }
    function updatePrice(_scoopprice: number, _sauceprice: number, _toppingprice: number, _sum: number): void {
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
    export function openCart(): void {
        nextPage();
        document.getElementById("price").style.visibility = "hidden";
        saveOrder();
        createDiv(orders[ordercount]);
    }

    function createDiv(_order: Order): void {
        let scoopstring: string = "";
        for (let i: number = 0; i < _order.scoops.length; i++) {
            if (i > 0) {
                scoopstring += " / " + _order.scoops[i].name + ": " + _order.scoops[i].amount;
            }
            else {
                scoopstring += + _order.scoops[i].name + ": " + _order.scoops[i].amount;
            }
        }
        let div: HTMLElement = document.createElement("div");
        let h: HTMLElement = document.createElement("h1");
        h.innerText = "Order " + (_order.ordernumber + 1);
        div.appendChild(h);
        let coc: HTMLElement = document.createElement("p");
        coc.innerText = "Container: " + _order.container;
        div.appendChild(coc);
        let scoop: HTMLElement = document.createElement("p");
        scoop.innerText = "Scoops: " + scoopstring;
        div.appendChild(scoop);
        let sauce: HTMLElement = document.createElement("p");
        sauce.innerText = "Sauce: " + _order.sauce;
        div.appendChild(sauce);
        let toppings: HTMLElement = document.createElement("p");
        toppings.innerText = "Toppings: " + _order.toppings;
        div.appendChild(toppings);
        let price: HTMLElement = document.createElement("p");
        if (this.sauce == "None") {
            price.innerText = "Price: " + _order.price + ".00€";
        }
        else {
            price.innerText = "Price: " + _order.price + "0€";
        }
        div.appendChild(price);
        document.getElementById("orders").appendChild(div);

    }

    function saveOrder(): void {
        let allscoops: string = "";
        let alltoppings: string = "";
        for (let i: number = 0; i < sortinputs.length; i++) {
            if (selectedsorts[i] > 0) {
                orders[ordercount].scoops.push({ name: sorts[i], amount: selectedsorts[i] });
            }
        }
        for (let i: number = 0; i < toppinginputs.length; i++) {
            if (toppinginputs[i].checked) {
                alltoppings += toppinginputs[i].value + ", ";
            }
        }

        orders[ordercount].toppings = alltoppings;
    }
    function checkValidity(): void {
        let firstname: HTMLInputElement = <HTMLInputElement>document.getElementById("firstname");
        let lastname: HTMLInputElement = <HTMLInputElement>document.getElementById("lastname");
        let email: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
        let street: HTMLInputElement = <HTMLInputElement>document.getElementById("street");
        let streetnumber: HTMLInputElement = <HTMLInputElement>document.getElementById("streetnumber");
        let postcode: HTMLInputElement = <HTMLInputElement>document.getElementById("postcode");
        let notvalid: string[] = [];
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
    function nextPage(): void {
        pages[currentpage].style.visibility = "hidden";
        pages[currentpage + 1].style.visibility = "visible";
        currentpage += 1;
    }

    function gotoServerPage(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("POST", "https://theicecreamshop.herokuapp.com", true);
        xhr.addEventListener("readystatechange", onStateChange);
        xhr.send(JSON.stringify(orders));
    }

    function onStateChange(_event: Event): void {
        let xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            let div: HTMLDivElement = <HTMLDivElement>document.getElementById("response");
            div.innerHTML = xhr.responseText;
        }
    }
    function createPagesArray(): void {
        pages[0] = document.getElementById("startpage");
        pages[1] = document.getElementById("coneorcup");
        pages[2] = document.getElementById("decisions");
        pages[3] = document.getElementById("cart");
        pages[4] = document.getElementById("data");
        pages[5] = document.getElementById("thanks");
    }
}