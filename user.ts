import inquirer from "inquirer";
import chalk from "chalk";
import { faker } from '@faker-js/faker'
import Table from "cli-table";
import { flightsArray} from "./flight.js"



export class user {
    masterCard: number
    cash: number
    baggage: string
    handCarry: string
    airport: string
    seatNumber: string
    meal: boolean
    terminal: string
    wheelChair: boolean
    connecting: string
    constructor() {
        this.masterCard = 5000
        this.cash = 2500
        this.baggage = "30 kg"
        this.handCarry = "7 kg"
        this.airport = "Jinnah International Airport"
        this.seatNumber = faker.airline.seat()
        this.meal = faker.datatype.boolean()
        this.terminal = "A"
        this.wheelChair = faker.datatype.boolean()
        this.connecting = "No"
    }
  getDepartDate(flightNum: string) {
        const flight = flightsArray.find(flight => flight.flightNum === flightNum);
        if (flight) {
            
                console.log( `${flight.departDate.toDateString()}`)     
        } else {
            return null;
        }
    }
    getDepartTime(flightNum: string) {
        const flight = flightsArray.find(flight => flight.flightNum === flightNum);
        if (flight) {
            
                console.log( `${flight.departTime}`)     
        } else {
            return null;
        }
    }
    purchaseCash(amount: number) {
        if (!amount) {
            console.log("Enter Amount In Numbers")
        }
        else if (amount > this.cash) {
            console.log("Purchase Failed!Dont Have Enough Cash")
        }
        else {
            console.log("Purchase Successful! Your E-TICKET has been Generated")
            console.log(`$ ${amount} cash has been deducted and your remaining cash back is $ ${this.cash - amount}`)
        }

    }
    purchaseCard(amount: number) {
        if (!amount) {
            console.log("Enter Amount In Numbers")
        }
        else if (amount > this.masterCard) {
            console.log("Purchase Failed!You Have Exceeded Your Card Limit")
        }
        else {
            console.log(chalk.bold.greenBright("Purchase Successful! Your E-TICKET has been Generated"))
            console.log(`$ ${amount} has been deducted from your card and your remaining balance is ${this.masterCard - amount}\n\n`)
        }
    }
    eTicket(flight: string, Class: string) {
        console.log(chalk.bold.greenBright("Your Flight From Karachi To Tehran is Confirmed\n\n"))
        console.log(chalk.bold.yellow(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>E-TICKET<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"))
                
        const receipt = new Table({
            head: [chalk.bold('FLIGHT NUMBER'), chalk.bold('CLASS'), chalk.bold('AIRPORT'), chalk.bold('TERMINAL')]
        })
        receipt.push(
            [`${flight}`, `${Class}`, `${this.airport}`, `${this.terminal}`],
            [chalk.bold.red('SEAT #'), chalk.bold.red('BAGGAGE ALLOWED'), chalk.bold.red('HAND-CARRY ALLOWED'), chalk.bold.red('WHEEL CHAIR')],
            [`${this.seatNumber}`, `${this.baggage}`, `${this.handCarry}`, `${this.wheelChair}`],
            [chalk.bold.red('MEAL INCLUDED'), chalk.bold.red('DEPARTURE DATE'), chalk.bold.red('DEPARTURE TIME'), chalk.bold.red('CONNECTING')],
            [`${this.meal}`, `${this.getDepartDate(flight)}`, `${this.getDepartTime(flight)}`, `${this.connecting}`]



        );
        console.log(receipt.toString())
    }

}
export const myUser = new user()


export async function booking() {


    const response = await inquirer.prompt([
        {
            name: "flight",
            type: "list",
            message: "Select Your Flight: ",
            choices: flightsArray.map(item => item.flightNum),
            validate: (input) => {
                if (!input) {
                    console.log("Please Select an Option")
                }
                else {
                    return true
                }
            }
        }, {
            name: "Class",
            type: "list",
            message: "Which Class Would You Like To Travel In?",
            choices: ["Business Class", "Economy Class"],
            validate: (input) => {
                if (!input) {
                    console.log("Please Select an Option")
                }
                else {
                    return true
                }
            }
        }])
    const { flight, Class } = response

    if (Class === "Business Class") {
        const ask = await inquirer.prompt({
            name: "bSeat",
            type: "input",
            message: "How Many Seats You Want To Book:"
        })
        if ((!ask.bSeat)) {
            console.log("Enter The Number Of Seats You need to Book")
        }

        else if (flight.bSeats === 0) {
            console.log("All The Saets Have Been Booked! ")
        }
        else if (flight.bSeats < ask.bSeat) {
            console.log(`Few Seats Are Available,You Can Book Only ${flight.bSeats}`)
        }
        else {
            console.log(`${ask.bSeat} Seats/Seat Booked`)

            console.log(`Amount Payable is ${ask.bSeat * flight.bTicketFare}`)

        }

    }

    else if (response.class === "Economy Class") {
        const ask = await inquirer.prompt({
            name: "eSeat",
            type: "input",
            message: "How Many Seats You Want To Book:"
        })

        if ((!ask.eSeat)) {
            console.log("Enter The Number Of Seats You need to Book")
        }

        else if (flight.eSeats === 0) {
            console.log("All The Saets Have Been Booked! ")
        }
        else if (flight.eSeats < ask.eSeat) {
            console.log(`Few Seats Are Available,You Can Book Only ${flight.eSeats}`)
        }
        else {
            console.log(`${ask.eSeat} Seats/Seat Booked ${flight.eTicketFare}`, "eseat")
            


            console.log(`Amount Payable is ${ask.eSeat * flight.eTicketFare}`)
        }

    }
    if (flight && Class) {
        const answer = await inquirer.prompt([
            {
                name: "payment",
                type: "list",
                message: "Select Your Payment Method:",
                choices: ["Cash", "Master Card"]
            }])

        if (answer.payment === "Cash") {
            const pay = await inquirer.prompt({
                name: "paid",
                type: "input",
                message: "Enter Amount:"
            })
            myUser.purchaseCash(pay.paid)
        }
        else if (answer.payment === "Master Card") {
            const pay = await inquirer.prompt({
                name: "paid",
                type: "input",
                message: "Enter Amount:"
            })
            myUser.purchaseCard(pay.paid)
        }
        else {
            console.log("Please Select a Valid Payment Method")
        }
    }
    
    myUser.eTicket(flight, Class)


}
