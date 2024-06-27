import inquirer from "inquirer";
import chalk from "chalk";
import { Flight, flightsArray, updateTable, myTable } from "./flight.js";
export class adminControl {
    flightAdd(data) {
        flightsArray.push(data);
        updateTable();
        console.log(myTable.toString());
        console.log("FLIGHT ADDED SUCCESSFULLY!");
    }
    flightUpdate(data) {
        let match = flightsArray.find(flight => flight.flightNum === data.flightNum);
        if (match) {
            Object.assign(match, data);
            updateTable();
            console.log(myTable.toString());
        }
        else {
            console.log("FLIGHT NOT FOUND!");
        }
    }
    flightRemove(flightNum) {
        const index = flightsArray.findIndex(flight => flight.flightNum === flightNum);
        if (index !== -1) {
            flightsArray.splice(index, 1);
            updateTable();
            console.log("FLIGHT REMOVED SUCCESSFULLY!");
            console.log(myTable.toString());
        }
        else {
            console.log("FLIGHT NOT FOUND!");
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
    let exit = false;
    while (!exit) {
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
                    type: "string",
                    message: "Enter Flight Number: ",
                    function(input) {
                        const flightNumFormat = /^[a-zA-Z0-9]+$/;
                        if (!flightNumFormat.test(input)) {
                            return "Flight number should consist of only letters and numbers.";
                        }
                        return true;
                    },
                    filter: function (input) {
                        return input.toUpperCase();
                    }
                }, {
                    name: "departDate",
                    type: "input",
                    message: "Enter Departure Date (YYYY-MM-DD): ",
                    validate: function (input) {
                        const currentDate = new Date();
                        const inputDate = new Date(input);
                        if (isNaN(inputDate.getTime())) {
                            return "Please enter a valid date.";
                        }
                        const diffDays = Math.ceil((inputDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
                        if (diffDays < 30) {
                            return "The departure date must be at least 30 days from today.";
                        }
                        return true;
                    }
                }, {
                    name: "departTime",
                    type: "string",
                    message: "Enter Departure Time (HH:mm): ",
                    validate: function (input) {
                        const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
                        if (!timeFormat.test(input)) {
                            return "Please enter a valid time in 24-hour format (HH:mm).";
                        }
                        return true;
                    }
                },
                {
                    name: "eClassFare",
                    type: "number",
                    message: "Enter Economy Class Fare: $/seat  "
                }, {
                    name: "eClass",
                    type: "number",
                    message: "Enter The Number Of Seats Available in Economy Class:"
                },
                {
                    name: "bClassFare",
                    type: "number",
                    message: "Enter Business Class Fare: $/seat"
                }, {
                    name: "bClass",
                    type: "number",
                    message: "Enter the Number of Seats Available in Business Class:"
                }
            ]);
            const { flightNum, departDate, departTime, eClassFare, eClass, bClassFare, bClass } = add;
            const flightAdded = new Flight(flightNum, new Date(departDate), departTime, parseFloat(eClassFare), parseInt(eClass), parseFloat(bClassFare), parseInt(bClass));
            myadminControl.flightAdd(flightAdded);
        }
        else if (response.option_selected === "UPDATE FLIGHTS") {
            const update = await inquirer.prompt([{
                    name: "flightNum",
                    type: "list",
                    message: "Select the Flight Number: ",
                    choices: flightsArray.map(item => item.flightNum)
                }, {
                    name: "departDate",
                    type: "input",
                    message: "Enter Departure Date (YYYY-MM-DD): ",
                    validate: function (input) {
                        const currentDate = new Date();
                        const inputDate = new Date(input);
                        if (isNaN(inputDate.getTime())) {
                            return "Please enter a valid date.";
                        }
                        const diffDays = Math.ceil((inputDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
                        if (diffDays < 30) {
                            return "The departure date must be at least 30 days from today.";
                        }
                        return true;
                    }
                }, {
                    name: "departTime",
                    type: "string",
                    message: "Enter Departure Time: ",
                    validate: function (input) {
                        const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;
                        if (!timeFormat.test(input)) {
                            return "Please enter a valid time in 24-hour format (HH:mm).";
                        }
                        return true;
                    }
                },
                {
                    name: "eClassFare",
                    type: "number",
                    message: "Enter Economy Class Fare: $/seat "
                }, {
                    name: "eClass",
                    type: "number",
                    message: "Enter The Number Of Seats Available in Economy Class: "
                },
                {
                    name: "bClassFare",
                    type: "number",
                    message: "Enter Business Class Fare: $/seat "
                }, {
                    name: "bClass",
                    type: "number",
                    message: "Enter The Number Of Seats Available in Business Class: "
                },
            ]);
            const { flightNum, departDate, departTime, eClassFare, eClass, bClassFare, bClass } = update;
            const flightUpdated = new Flight(flightNum, new Date(departDate), departTime, parseFloat(eClassFare), parseInt(eClass), parseFloat(bClassFare), parseInt(bClass));
            myadminControl.flightUpdate(flightUpdated);
        }
        else if (response.option_selected === "REMOVE FLIGHT") {
            const ask = await inquirer.prompt({
                name: "givenFlightNum",
                type: "list",
                message: "Choose the Flight Number You Want To Remove",
                choices: flightsArray.map(item => item.flightNum)
            });
            myadminControl.flightRemove(ask.givenFlightNum);
        }
        else if (response.option_selected === "SHOW ANALYTICS") {
            myadminControl.Analytics();
        }
        else if (response.option_selected === "EXIT") {
            console.log(chalk.bold.blueBright("Exiting......"));
            exit = true;
        }
    }
}
