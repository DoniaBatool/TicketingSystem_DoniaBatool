#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { isNumber, isString } from "util";
import { faker } from '@faker-js/faker'
import { myTable } from "./flight.js";
import { booking } from "./user.js";
import { access } from "./admin.js";
// import * as user from "./user.js"
// let plane =  `  ,--.
//                     \  _\_
//                     _\/_|_\____.'\
//                 -(___.--._____(
//                        \   \
//                         \   \
//                          `--'`


// console.log(plane);

class Account {
    static counter = 99999;
    id: number;
    firstName: string
    lastName: string
    passportNumber: string
    origin: string

    constructor() {
        this.id = Account.counter++
        this.firstName = ""
        this.lastName = ""
        this.passportNumber = ""
        this.origin = ""
    }

}
//=========================================//
class Account2 {
    memberArray: Account[] = []

    memberRecord(object: Account) {
        this.memberArray.push(object)
    }

}
class Super_Admin {
    admin_Name: string
    password: string

    constructor() {
        this.admin_Name = "mySelf"
        this.password = "19_mySelf"

    }

}
const myAccount = new Account()
const myAccount2 = new Account2()
const myAdmin = new Super_Admin()
//--------------------------------------------------------------//

async function login1() {

    console.log("ENTER LOGIN DETAILS:");


    const dataLog = await inquirer.prompt([
        {
            name: "logFname",
            type: "input",
            message: "Enter your First Name: "
        },
        {
            name: "logLname",
            type: "input",
            message: "Enter your Last Name: "
        },
        {
            name: chalk.yellow("logId"),
            type: "input",
            message: "Enter your Account ID: "
        }
    ]);

    const { logFname, logLname, logId } = dataLog;

    function logIn(fName: string, lName: string, id: number) {
        let match = myAccount2.memberArray.filter((item) => { item.firstName === fName && item.lastName === lName && item.id === id })
        if (match) {
            console.log("LogIn Successful!")
            console.log(chalk.bold.yellowBright("                             خوش آمدید به پلتفرم بلیط‌های الکترونیکی هواپیمایی ایران "))
            console.log(chalk.bold.yellowBright("                                      WELCOME TO THE E-TICKETING PURCHASE PORTAL"))
            console.log(chalk.bold.yellowBright("*").repeat(90))

            console.log(chalk.bold.yellowBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DIRECT FLIGHTS FROM KARACHI TO TEHRAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"))
            console.log(myTable.toString())
            console.log("user is login su");

            // return booking()

        }
        else {
            console.log("Invalid Details!")
        }
    }
    logIn(logFname, logLname, logId)

}

//==========================================================// 


async function ticketing() {
    console.log(chalk.bold.blueBright("    .خوش آمدید به سامانه بلیط الکترونیکی هواپیمایی ایران"))
    console.log(chalk.bold.blueBright("            WELCOME TO IRAN AIR E-TICKETING PLATFORM"));
    console.log(chalk.bold.yellowBright("*").repeat(90))
    const response = await inquirer.prompt([
        {
            name: "User",
            type: "list",
            message: chalk.bold.bgBlueBright.yellowBright("If You Are Already a Member LogIn To Your Account otherwise Sign Up"),
            choices: ["Sign Up", "User LogIn", "Admin LogIn"]
        }
    ]);

    if (response.User === "Sign Up") {
        const SignUp = await inquirer.prompt([
            {
                name: "fName",
                type: "input",
                message: "Enter Your First Name: ",

            },
            {
                name: "lName",
                type: "input",
                message: "Enter Your Last Name: "
            },
            {
                name: "passportNum",
                type: "input",
                message: "Enter Your Passport Number: "
            },
            {
                name: "Origin",
                type: "input",
                message: "Enter Your Country of Origin: "
            }
        ]);

        const { fName, lName, passportNum, Origin } = SignUp;

        if (fName && lName && Origin && passportNum) {

            console.log("Details Submitted!");

            myAccount2.memberRecord(SignUp)
            console.log(myAccount2)

            console.log(`Account Created Successfully. Your Account ID is:${chalk.yellow(myAccount.id)} \nPlease LogIn To Your Account`);

            await login1()
            await booking()

        }
        else {
            console.log("Please Enter SignUp Details Correctly");
        }
    }

    //====================================================================================//


    else if (response.User === "User LogIn") {

      await login1()
      await booking()

    }


    else if (response.User === "Admin LogIn") {

        const adminData = await inquirer.prompt([{
            name: "admin_name",
            type: "input",
            message: "Enter Your Name: ",
            validate: (input) => {
                if (input !== myAdmin.admin_Name) {
                    console.log("invalid Name")
                }
                else {
                    return true
                }
            }
        },
        {
            name: "admin_password",
            type: "input",
            message: "Enter Your Password: ",
            validate: (input) => {
                if (input !== myAdmin.password) {
                    console.log("Invalid Password")
                }
                else {
                    return true
                }
            }
        }])
        console.log(chalk.bold.yellowBright("                       خوش آمدید به پلتفرم بلیط‌های الکترونیکی هواپیمایی ایران "))
        console.log(chalk.bold.yellowBright("                                      WELCOME TO THE ADMIN PORTAL"))
        console.log(chalk.bold.yellowBright("*").repeat(90))

        console.log(chalk.bold.yellowBright(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>DIRECT FLIGHTS FROM KARACHI TO TEHRAN<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<"))
        console.log(myTable.toString())
await access()
        
    }

}
await ticketing()


