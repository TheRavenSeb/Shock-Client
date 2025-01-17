const shocker = require("shock-client")
const {MyShockConfig} = require("pathTo/shock/config")

const PiShock = new shocker(MyShockConfig)



const Intensity = 5 //  voltage value
const Duration = 1 //   The Duration the shock will operate


//!SECTION shocking a brat

PiShock.shock(Intensity,Duration) // You also can use PiShock.zap(Intensity,Duration)

//!SECTION vibration 

PiShock.vibrate(Intensity,Duration) //  you also can do PiShock.Buss(Intensity,Duration)


//!SECTION Getting shocker info
PiShock.info() // returns info of pishock device
