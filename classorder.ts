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
    export interface Order {
        ordernumber: number;
        container: string;
        scoops: {name: string, amount: number}[];
        sauce: string;
        toppings: string;
        price: number;
    }
}