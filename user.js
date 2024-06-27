import inquirer from "inquirer";
import chalk from "chalk";
import { faker } from '@faker-js/faker';
import Table from "cli-table";
import { flightsArray } from "./flight.js";
import { updateTable } from "./flight.js";
export class user {
    masterCard;
    cash;
    baggage;
    handCarry;
    airport;
    seatNumber;
    meal;
    terminal;
    wheelChair;
    connecting;
    constructor() {
        this.masterCard = 5000;
        this.cash = 2500;
        this.baggage = "30 kg";
        this.handCarry = "7 kg";
        this.airport = "Jinnah International Airport";
        this.seatNumber = faker.airline.seat();
        this.meal = faker.datatype.boolean();
        this.terminal = "A";
        this.wheelChair = faker.datatype.boolean();
        this.connecting = "No";
    }
    getDepartDate(flightNum) {
        const flight = flightsArray.find(flight => flight.flightNum === flightNum);
        if (flight) {
            return (`${flight.departDate.toDateString()}`);
        }
        else {
            return null;
        }
    }
    getDepartTime(flightNum) {
        const flight = flightsArray.find(flight => flight.flightNum === flightNum);
        if (flight) {
            return (`${flight.departTime}`);
        }
        else {
            return null;
        }
    }
    purchaseCash(amount) {
        if (!amount) {
            console.log("Enter Amount In Numbers");
        }
        else if (amount > this.cash) {
            console.log("Purchase Failed!Dont Have Enough Cash");
        }
        else {
            console.log("Purchase Successful! Your E-TICKET has been Generated");
            console.log(`$ ${amount} cash has been deducted and your remaining cash back is $ ${this.cash - amount}`);
        }
    }
    purchaseCard(amount) {
        if (!amount) {
            console.log("Enter Amount In Numbers");
        }
        else if (amount > this.masterCard) {
            console.log("Purchase Failed!You Have Exceeded Your Card Limit");
        }
        else {
            console.log(chalk.bold.greenBright("Purchase Successful! Your E-TICKET has been Generated"));
            console.log(`$ ${amount} has been deducted from your card and your remaining balance is ${this.masterCard - amount}\n\n`);
        }
    }
    eTicket(flight, Class) {
        console.log(chalk.bold.greenBright("Your Flight From Karachi To Tehran is Confirmed\n"));
        console.log(chalk.bold.yellow(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>E-TICKET<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));
        const receipt = new Table({
            head: [chalk.bold('FLIGHT NUMBER'), chalk.bold('CLASS'), chalk.bold('AIRPORT'), chalk.bold('TERMINAL')]
        });
        receipt.push([`${flight}`, `${Class}`, `${this.airport}`, `${this.terminal}`], [chalk.bold.red('SEAT #'), chalk.bold.red('BAGGAGE ALLOWED'), chalk.bold.red('HAND-CARRY ALLOWED'), chalk.bold.red('WHEEL CHAIR')], [`${this.seatNumber}`, `${this.baggage}`, `${this.handCarry}`, `${this.wheelChair}`], [chalk.bold.red('MEAL INCLUDED'), chalk.bold.red('DEPARTURE DATE'), chalk.bold.red('DEPARTURE TIME'), chalk.bold.red('CONNECTING')], [`${this.meal}`, `${this.getDepartDate(flight)}`, `${this.getDepartTime(flight)}`, `${this.connecting}`]);
        console.log(receipt.toString());
    }
}
export const myUser = new user();
export async function booking() {
    let exit = false;
    while (!exit) {
        const response = await inquirer.prompt([
            {
                name: "flight",
                type: "list",
                message: "Select Your Flight: ",
                choices: [...flightsArray.map(item => item.flightNum), "Exit"],
                validate: (input) => {
                    if (!input) {
                        return "Please Select an Option";
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        if (response.flight === "Exit") {
            console.log("Exiting");
            exit = true;
            continue;
        }
        const selectedFlight = flightsArray.find(f => f.flightNum === response.flight);
        if (!selectedFlight) {
            console.log("Flight not found!");
            continue;
        }
        // Calculate the difference between the current date and the departure date
        const currentDate = new Date().getTime();
        const departDate = new Date(selectedFlight.departDate).getTime();
        const diffDays = Math.ceil((departDate - currentDate) / (1000 * 60 * 60 * 24));
        // Check if the departure date is at least 15 days away
        if (diffDays < 15) {
            console.log(chalk.bold.redBright(`Booking Closed! You can only book flights with a departure date that is at least 15 days from today.`));
            continue;
        }
        const classResponse = await inquirer.prompt([
            {
                name: "Class",
                type: "list",
                message: "Which Class Would You Like To Travel In?",
                choices: ["Business Class", "Economy Class"],
                validate: (input) => {
                    if (!input) {
                        return "Please Select an Option";
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        const { flight, Class } = { flight: response.flight, Class: classResponse.Class };
        if (Class === "Business Class") {
            const ask = await inquirer.prompt({
                name: "bSeat",
                type: "input",
                message: "How Many Seats You Want To Book:"
            });
            const seatsToBook = parseInt(ask.bSeat, 10);
            if ((!ask.bSeat)) {
                console.log("Enter The Number Of Seats You need to Book");
            }
            else if (selectedFlight && selectedFlight.bSeats === 0) {
                console.log("All The Seats Have Been Booked! ");
            }
            else if (selectedFlight && selectedFlight.bSeats < seatsToBook) {
                console.log(`Few Seats Are Available, You Can Book Only ${selectedFlight.bSeats}`);
            }
            else if (selectedFlight) {
                selectedFlight.bSeats -= seatsToBook;
                updateTable();
                const amountPayable = seatsToBook * selectedFlight.bTicketFare;
                console.log(`${seatsToBook} Seats/Seat Booked`);
                console.log(`Amount Payable is $${amountPayable}`);
                const paymentResponse = await inquirer.prompt([
                    {
                        name: "paymentMethod",
                        type: "list",
                        message: "Select Payment Method: ",
                        choices: ["Cash", "Card"]
                    }
                ]);
                if (paymentResponse.paymentMethod === "Cash") {
                    myUser.purchaseCash(amountPayable);
                }
                else if (paymentResponse.paymentMethod === "Card") {
                    const card = await inquirer.prompt({
                        name: "CardNum",
                        type: "password",
                        mask: "$",
                        message: "Enter card number: ",
                        validate: (input) => /^[0-9]{11}$/.test(input) || "Card number must be exactly 11 numbers."
                    });
                    myUser.purchaseCard(amountPayable);
                }
                myUser.eTicket(flight, Class);
            }
        }
        else if (Class === "Economy Class") {
            const ask = await inquirer.prompt({
                name: "eSeat",
                type: "input",
                message: "How Many Seats You Want To Book:"
            });
            const seatsToBook = parseInt(ask.eSeat, 10);
            if ((!ask.eSeat)) {
                console.log("Enter The Number Of Seats You need to Book");
            }
            else if (selectedFlight && selectedFlight.eSeats === 0) {
                console.log("All The Seats Have Been Booked! ");
            }
            else if (selectedFlight && selectedFlight.eSeats < seatsToBook) {
                console.log(`Few Seats Are Available, You Can Book Only ${selectedFlight.eSeats}`);
            }
            else if (selectedFlight) {
                selectedFlight.eSeats -= seatsToBook;
                updateTable();
                const amountPayable = seatsToBook * selectedFlight.eTicketFare;
                console.log(`${seatsToBook} Seats/Seat Booked`);
                console.log(`Amount Payable is $${amountPayable}`);
                const paymentResponse = await inquirer.prompt([
                    {
                        name: "paymentMethod",
                        type: "list",
                        message: "Select Payment Method: ",
                        choices: ["Cash", "Card"]
                    }
                ]);
                if (paymentResponse.paymentMethod === "Cash") {
                    myUser.purchaseCash(amountPayable);
                }
                else if (paymentResponse.paymentMethod === "Card") {
                    myUser.purchaseCard(amountPayable);
                }
                myUser.eTicket(flight, Class);
            }
        }
    }
}
