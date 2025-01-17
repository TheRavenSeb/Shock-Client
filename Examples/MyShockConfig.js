require("dotenv").config();

module.exports = {
    MyShockConfig: {
        Username: "theravenseb", // Your account username
        Apikey: process.env.Apikey, // Api Key gotten off of pi shock website
        Code: "123456", // Share or device code 
        Name: "TheRavenSeb", // Name you wish to have appear in logs
        LogVerbose: 2, // value > 2 debug
        IsSitEnabled: true // enables the sitDown() function (VERY DANGEROUS USE AT YOUR OWN DISGRESTION)

    }
}