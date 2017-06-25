console.log("Server starting");

import Http = require("http");
import Url = require("url");

interface AssocStringString {
    [key: string]: string;
}

let port: number = process.env.PORT;
if (port == undefined)
    port = 8100;

let server: Http.Server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);

function handleListen(): void {
    console.log("Listening on port: " + port);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Request received");
    let rawData: Buffer[] = [];
    let data: Order[];

    _request.on("data", function(_chunk: Buffer): void {
        rawData.push(_chunk);
    });

    _request.on("end", function(): void {
        console.log(rawData);
        data = JSON.parse(rawData.concat().toString());
        console.log(data);

        sendResponse();
    });
    function sendResponse(): void {
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.write("<h1>ordering confirmation</h1>");
        for (let i: number = 0; i < data.length; i++) {
            let scoopstring: string = "";
            for (let j: number = 0; j < data[i].scoops.length; j++) {
                if (i > 0) {
                    scoopstring += " / " + data[i].scoops[j].name + ": " + data[i].scoops[j].amount;
                }
                else {
                    scoopstring += + data[i].scoops[j].name + ": " + data[i].scoops[j].amount;
                }
            }
            _response.write("<h2>Order " + data[i].ordernumber + "</h2>");
            _response.write("<p>Container: " + data[i].container + "<p>");
            _response.write("<p>Scoops: " + scoopstring + "<p>");
            _response.write("<p>Sauce: " + data[i].sauce + "<p>");
            _response.write("<p>Toppings: " + data[i].toppings + "<p>");
            _response.write("<p>Price: " + data[i].price + "<p>");
        }
        _response.end();
    }
}
interface Order {
    ordernumber: number;
    container: string;
    scoops: { name: string, amount: number }[];
    sauce: string;
    toppings: string;
    price: number;
}