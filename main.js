#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { myTable } from "./flight.js";
import { booking } from "./user.js";
import { access } from "./admin.js";
class Account {
    static counter = 99999;
    id;
    firstName;
    lastName;
    passportNumber;
    origin;
    constructor(firstName, lastName, passportNumber, origin) {
        this.id = Account.counter++;
        this.firstName = firstName.toUpperCase();
        this.lastName = lastName.toUpperCase();
        this.passportNumber = passportNumber;
        this.origin = origin;
    }
}
//=========================================//
class Account2 {
    memberArray = [];
    memberRecord(object) {
        this.memberArray.push(object);
    }
    findAccount(firstName, lastName, id) {
        return this.memberArray.find(account => account.firstName === firstName && account.lastName === lastName && account.id === id);
    }
}
class Super_Admin {
    admin_Name;
    password;
    constructor() {
        this.admin_Name = "mySelf";
        this.password = "19_mySelf";
    }
}
const myAccount2 = new Account2();
const myAdmin = new Super_Admin();
//--------------------------------------------------------------//
async function login1() {
    console.log("ENTER LOGIN DETAILS:");
    const dataLog = await inquirer.prompt([
        {
            name: "logFname",
            type: "string",
            message: "Enter your First Name: ",
            filter: (input) => input.toUpperCase(),
            validate: (input) => /^[A-Z]+$/.test(input) || "Please enter a valid name with alphabets only."
        },
        {
            name: "logLname",
            type: "string",
            message: "Enter your Last Name: ",
            filter: (input) => input.toUpperCase(),
            validate: (input) => /^[A-Z]+$/.test(input) || "Please enter a valid name with alphabets only."
        },
        {
            name: "logId",
            type: "number",
            message: "Enter your Account ID: ",
            validate: (input) => !isNaN(parseInt(input, 10)) || "Please enter a valid numeric ID."
        }
    ]);
    const { logFname, logLname, logId } = dataLog;
    const id = parseInt(logId, 10);
    const account = myAccount2.findAccount(logFname, logLname, id);
    if (account) {
        console.log("LogIn Successful!");
        console.log(chalk.bold.yellowBright("                             خوش آمدید به پلتفرم بلیط‌های الکترونیکی هواپیمایی ایران "));
        console.log(chalk.bold.yellowBright("                                      WELCOME TO THE E-TICKETING PURCHASE PORTAL"));
        console.log(chalk.bold.yellowBright("*").repeat(90));
        console.log(chalk.bold.yellowBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DIRECT FLIGHTS FROM KARACHI TO TEHRAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));
        console.log(myTable.toString());
        await booking();
    }
    else {
        console.log("Invalid Details!");
    }
}
//==========================================================// 
async function ticketing() {
    console.log(chalk.bold.blueBright("    .خوش آمدید به سامانه بلیط الکترونیکی هواپیمایی ایران"));
    console.log(chalk.bold.blueBright("            WELCOME TO IRAN AIR E-TICKETING PLATFORM"));
    console.log(chalk.bold.yellowBright("*").repeat(90));
    while (true) {
        const response = await inquirer.prompt([
            {
                name: "User",
                type: "list",
                message: chalk.bold.bgBlueBright.yellowBright("If You Are Already a Member LogIn To Your Account otherwise Sign Up"),
                choices: ["Sign Up", "User LogIn", "Admin LogIn", "Exit"]
            }
        ]);
        if (response.User === "Sign Up") {
            const SignUp = await inquirer.prompt([
                {
                    name: "fName",
                    type: "string",
                    message: "Enter Your First Name: ",
                    filter: (input) => input.toUpperCase(),
                    validate: (input) => /^[A-Z]+$/.test(input) || "Please enter a valid name with alphabets only."
                },
                {
                    name: "lName",
                    type: "string",
                    message: "Enter Your Last Name: ",
                    filter: (input) => input.toUpperCase(),
                    validate: (input) => /^[A-Z]+$/.test(input) || "Please enter a valid name with alphabets only."
                },
                {
                    name: "passportNum",
                    type: "password",
                    mask: "*",
                    message: "Enter Your Passport Number: ",
                    validate: (input) => /^[a-zA-Z0-9]{11}$/.test(input) || "Passport number must be exactly 11 alphanumeric characters."
                },
                {
                    name: "Origin",
                    type: "string",
                    message: "Enter Your Country of Origin: ",
                    filter: (input) => input.toUpperCase(),
                    validate: (input) => /^[A-Z]+$/.test(input) || "Please enter a valid name with alphabets only."
                }
            ]);
            const { fName, lName, passportNum, Origin } = SignUp;
            if (!fName || !lName || !passportNum || !Origin) {
                console.log("Please Enter SignUp Details Correctly");
            }
            else {
                console.log("Details Submitted!");
                const newAccount = new Account(fName, lName, passportNum, Origin);
                myAccount2.memberRecord(newAccount);
                console.log(`Account Created Successfully. Your Account ID is: ${chalk.yellow(newAccount.id)} \nPlease LogIn To Your Account`);
                await login1();
            }
        }
        else if (response.User === "User LogIn") {
            await login1();
        }
        else if (response.User === "Admin LogIn") {
            const adminData = await inquirer.prompt([{
                    name: "admin_name",
                    type: "string",
                    message: "Enter Your Name: ",
                    validate: (input) => {
                        if (input !== myAdmin.admin_Name) {
                            console.log("invalid Name");
                        }
                        else {
                            return true;
                        }
                    }
                },
                {
                    name: "admin_password",
                    type: "password",
                    message: "Enter Your Password: ",
                    mask: "*",
                    validate: (input) => /^[A-Za-z0-9_]{9}$/.test(input) || "Password must be exactly 9 characters long and contain only numbers, alphabets, and underscores."
                }]);
            console.log(chalk.bold.yellowBright("                       خوش آمدید به پلتفرم بلیط‌های الکترونیکی هواپیمایی ایران "));
            console.log(chalk.bold.yellowBright("                                      WELCOME TO THE ADMIN PORTAL"));
            console.log(chalk.bold.yellowBright("*").repeat(90));
            console.log(chalk.bold.yellowBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DIRECT FLIGHTS FROM KARACHI TO TEHRAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"));
            console.log(myTable.toString());
            await access();
        }
        else if (response.User === "Exit") {
            console.log("Exiting...");
            process.exit(0);
        }
    }
}
ticketing();
