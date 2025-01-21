const shocker = require("E:/coding_projects/Shock-Client/index.js")
require('dotenv').config()


const pishock = new shocker({
    Username: "theravenseb", // Your account username
    Apikey: process.env.API_KEY, // Api Key gotten off of pi shock website
    Code: "123456", // Share or device code 
    Name: "TheRavenSeb", // Name you wish to have appear in logs
    LogVerbose: 2, // value > 2 debug
    IsSitEnabled: true // enables the sitDown() function (VERY DANGEROUS USE AT YOUR OWN DISGRESTION)

})

async function start(){
    pishock.onEvent("ready", async () => {
        console.log("Ready")
        var api =  await pishock.getDevices()
        console.log(api)

        api.forEach((device) => {
            console.log(device)
        }
        )
        pishock.ping()

        
    })

  
}
start()