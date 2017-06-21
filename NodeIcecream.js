"use strict";
console.log("Server starting");
const Http = require("http");
let port = process.env.PORT;
if (port == undefined)
    port = 8100;
let server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);
function handleListen() {
    console.log("Listening on port: " + port);
}
function handleRequest(_request, _response) {
    console.log("Request received");
    let rawData = [];
    let data;
    _request.on("data", function (_chunk) {
        rawData.push(_chunk);
    });
    _request.on("end", function () {
        data = JSON.parse(rawData.concat().toString());
        console.log(data);
        sendResponse();
    });
    function sendResponse() {
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.write("<h1>ordering confirmation</h1>");
        for (let i = 0; i < data.length; i++) {
            let scoopstring = "";
            for (let i = 0; i < data[i].scoops.length; i++) {
                if (i > 0) {
                    scoopstring += " / " + data[i].scoops[i].name + ": " + data[i].scoops[i].amount;
                }
                else {
                    scoopstring += +data[i].scoops[i].name + ": " + data[i].scoops[i].amount;
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
//# sourceMappingURL=NodeIcecream.js.map