const shocker = require("E:/coding_projects/Shock-Client/index.js")
require('dotenv').config()


const pishock = new shocker({
    Username: "theravenseb", // Your account username
    Apikey: process.env.API_KEY, // Api Key gotten off of pi shock website
    Code: "123456", // Share or device code 
    Name: "TheRavenSeb", // Name you wish to have appear in logs
    LogVerbose: 3, // value > 2 debug
    IsSitEnabled: true, // enables the sitDown() function (VERY DANGEROUS USE AT YOUR OWN DISGRESTION)
    HubName: "puppy"

})

async function start(){
    pishock.onEvent("ready", async () => {
        console.log("Ready")
        pishock.beep("puppy 1 ", 1, 10)
       

        
    })
    pishock.onEvent("shock", async (data) => {
        console.log(data)
    })
    pishock.onEvent("sit", async (data) => {
        console.log(data)
    })
    pishock.onEvent("error", async (data) => {
        console.log(data)
    })
    
    pishock.onEvent("vibrate", async (data) => {
        console.log(data)
    })
    pishock.onEvent("beep", async (data) => {
        console.log(data)
    })


  
}
start()