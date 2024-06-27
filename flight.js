import Table from "cli-table";
export class Flight {
    flightNum;
    departDate;
    departTime;
    eTicketFare;
    eSeats;
    bTicketFare;
    bSeats;
    constructor(flightNum, departDate, departTime, eTicketFare, eSeats, bTicketFare, bSeats) {
        this.flightNum = flightNum;
        this.departDate = departDate;
        this.departTime = departTime;
        this.eTicketFare = eTicketFare;
        this.eSeats = eSeats;
        this.bTicketFare = bTicketFare;
        this.bSeats = bSeats;
    }
}
export const myFlight1 = new Flight("IR901", new Date(2024, 8, 7), "12:30", 350, 300, 600, 20);
export const myFlight2 = new Flight("IR902", new Date(2024, 10, 17), "23:15", 300, 400, 650, 10);
export const myFlight3 = new Flight("IR903", new Date(2024, 10, 18), "18:45", 320, 350, 680, 25);
export const flightsArray = [myFlight1, myFlight2, myFlight3];
export const myTable = new Table({
    head: [
        'FLIGHT\nNUMBER',
        'DEPARTURE\nDATE',
        'DEPARTURE\nTIME',
        'ECONOMY-FARE\n($/seat)',
        'E-SEATS\nAVAILABLE',
        'BUSINESS-FARE\n($/seat)',
        'B-SEATS\nAVAILABLE'
    ],
});
// Function to update the table with flight data
export function updateTable() {
    myTable.length = 0; // Clear the table first
    flightsArray.forEach(flight => {
        myTable.push([
            flight.flightNum,
            flight.departDate.toDateString(),
            flight.departTime,
            flight.eTicketFare.toFixed(2),
            flight.eSeats.toString(),
            flight.bTicketFare.toFixed(2),
            flight.bSeats.toString()
        ]);
    });
}
// Initial table population
updateTable();
