import inquirer from "inquirer";
import chalk from "chalk";
import { myTable, Flight, flightsArray } from "./flight.js";
// const body = await got('https://www.google.com/imgres?q=iran%20air%20image%20in%20png%20format&imgurl=https%3A%2F%2Fw7.pngwing.com%2Fpngs%2F374%2F793%2Fpng-transparent-iran-air-airplane-flight-airline-airplane-text-logo-computer-wallpaper.png&imgrefurl=https%3A%2F%2Fwww.pngwing.com%2Fen%2Fsearch%3Fq%3Diran%2BAir&docid=LaaJPW_vtod88M&tbnid=7Gnyp6zb9UpGXM&vet=12ahUKEwjq56imkqaGAxVdR_EDHdSPD-MQM3oECDYQAA..i&w=920&h=368&hcb=2&ved=2ahUKEwjq56imkqaGAxVdR_EDHdSPD-MQM3oECDYQAA').buffer();
// console.log(await terminalImage.buffer(body),{width: '50%', height: '50%'});
// const image=await terminalImage.file('file ka path add karo')
// console.log(image, {width: '50%', height: '50%'});
export class adminControl {
    flightAdd(data) {
        flightsArray.push(data);
        myTable.push([data.flightNum,
            data.departDate.toString(),
            data.departTime,
            data.bTicketFare,
            data.bSeats.toString(), data.eTicketFare, data.eSeats.toString()]);
        console.log(myTable.toString());
        console.log("FLIGHT ADDED SUCCESSFULLY!");
    }
    flightUpdate(data) {
        flightsArray.push(data);
        let match = flightsArray.find((flight) => { flight.flightNum === data.flightNum; });
        if (match) {
            let Find = flightsArray.indexOf(match);
            flightsArray.forEach(flight => {
                myTable.push([
                    flight.flightNum,
                    flight.departDate.toDateString(),
                    flight.departTime,
                    flight.eTicketFare,
                    flight.eSeats.toString(),
                    flight.bTicketFare,
                    flight.bSeats.toString()
                ]);
            });
            console.log("FLIGHT UPDATED SUCCESSFULLY!");
            console.log(myTable.toString());
        }
        else {
            console.log("FLIGHT NOT FOUND!");
        }
    }
    flightRemove(data) {
        let match = flightsArray.filter((item) => { item.flightNum === data; });
        if (match) {
            console.log("Flight removed successfully!");
            console.log(myTable.toString());
        }
        else {
            console.log("Flight not found.");
        }
    }
    Analytics() {
        console.log(chalk.bold.yellowBright("                         پروازهای مستقیم از کراچی به تهران"));
        console.log(chalk.bold.yellowBright("                        DIRECT FLIGHTS FROM KARACHI TO TEHRAN"));
        console.log(chalk.bold.yellowBright("*").repeat(90));
        console.log(myTable.toString());
    }
}
const myadminControl = new adminControl();
export async function access() {
    const response = await inquirer.prompt([{
            name: "option_selected",
            type: "list",
            message: "Please Select an Option from The List: ",
            choices: ["ADD FLIGHTS", "UPDATE FLIGHTS", "REMOVE FLIGHT", "SHOW ANALYTICS", "EXIT"]
        }]);
    if (response.option_selected === "ADD FLIGHTS") {
        const add = await inquirer.prompt([
            {
                name: "flightNum",
                type: "input",
                message: "Enter Flight Number: "
            }, {
                name: "departDate",
                type: "input",
                message: "Enter Departure Date: "
            }, {
                name: "departTime",
                type: "input",
                message: "Enter Departure Time: "
            },
            {
                name: "eClassFare",
                type: "input",
                message: "Enter Economy Class Fare: $/seat  "
            }, {
                name: "eClass",
                type: "input",
                message: "Enter The Number Of Seats Available in Economy Class:"
            },
            {
                name: "bClassFare",
                type: "input",
                message: "Enter Business Class Fare: $/seat"
            }, {
                name: "bClass",
                type: "input",
                message: "Enter the Number of Seats Available in Business Class:"
            }
        ]);
        const { flightNum, departDate, departTime, eClassFare, eClass, bClassFare, bClass } = add;
        const flightAdded = new Flight(flightNum, departDate, departTime, eClassFare, eClass, bClassFare, bClass);
        myadminControl.flightAdd(flightAdded);
    }
    else if (response.option_selected === "UPDATE FLIGHTS") {
        const update = await inquirer.prompt([{
                name: "flightNum",
                type: "input",
                message: "Enter Flight Number: "
            }, {
                name: "departDate",
                type: "input",
                message: "Enter Departure Date: "
            }, {
                name: "departTime",
                type: "input",
                message: "Enter Departure Time: "
            },
            {
                name: "eClassFare",
                type: "input",
                message: "Enter Economy Class Fare: $/seat "
            }, {
                name: "eClass",
                type: "input",
                message: "Enter The Number Of Seats Available in Economy Class: "
            },
            {
                name: "bClassFare",
                type: "input",
                message: "Enter Business Class Fare: $/seat "
            }, {
                name: "bClass",
                type: "input",
                message: "Enter The Number Of Seats Available in Business Class: "
            },
        ]);
        const { flightNum, departDate, departTime, eClassFare, eClass, bClassFare, bClass } = update;
        const FlightUpdated = new Flight(flightNum, departDate, departTime, eClassFare, eClass, bClassFare, bClass);
        myadminControl.flightUpdate(FlightUpdated);
    }
    else if (response.option_selected === "REMOVE FLIGHT") {
        const ask = await inquirer.prompt({
            name: "givenFlightNum",
            type: "list",
            message: "Choose the Flight Number You Want To Remove",
            choices: flightsArray.map(item => item.flightNum)
        });
        let match = flightsArray.filter((item) => { item.flightNum == ask.givenFlightNum; });
        if (match) {
            flightsArray.splice(ask.givenFlightNum.index, 1);
            console.log(myTable.toString());
            console.log("FLIGHT REMOVED SUCCESSFULLY!");
        }
        else {
            console.log("FLIGHT NOT FOUND!");
        }
    }
    else if (response.option_selected === "SHOW ANALYTICS") {
        console.log(myTable.toString());
    }
    else if (response.option_selected === "EXIT") {
        console.log(chalk.bold.blueBright("Exiting......"));
    }
}
