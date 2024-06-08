
import inquirer from "inquirer"
import chalk from "chalk"
import Table from "cli-table";



export class Flight {
    flightNum: string;
    departDate: Date;
    departTime: string;
    eTicketFare: string;
    eSeats: number;
    bTicketFare: string;
    bSeats: number;

    constructor(
        flightNum: string,
        departDate: Date,
        departTime: string,
        eTicketFare: string,
        eSeats: number,
        bTicketFare: string,
        bSeats: number
    ) {
        this.flightNum = flightNum;
        this.departDate = departDate;
        this.departTime = departTime;
        this.eTicketFare = eTicketFare;
        this.eSeats = eSeats;
        this.bTicketFare = bTicketFare;
        this.bSeats = bSeats;
    }
}

export const myFlight1 = new Flight("IR901", new Date(2024, 5, 15), "4:30 PM", "350", 300, "600", 20);
export const myFlight2 = new Flight("IR902", new Date(2024, 5, 17), "6:30 AM", "300", 400, "650", 10);
export const myFlight3 = new Flight("IR903", new Date(2024, 5, 18), "9:30 PM", "320", 350, "680", 25);


export const flightsArray: Flight[] = [myFlight1, myFlight2, myFlight3];



export const myTable = new Table({
    head: ['FLIGHT NUMBER', 'DEPARTURE DATE', 'DEPARTURE TIME', 'ECONOMY-CLASS FARE\n   ($/seat)', 'E-SEATS AVAILABLE', 'BUSINESS-CLASS FARE\n   ($/seat)', 'B-SEATS AVAILABLE']
});


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




