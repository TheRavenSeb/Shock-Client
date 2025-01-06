//class file for Shocker
const data = require('./data/uri.js')



/**
 * @class Shocker
 * @classdesc This class is used to create a new Shocker object
 * @param {string} username - Username you use to log into PiShock.com. Can be found in the Account section of the website.
 * @param {string} Apikey - API Key generated on PiShock.com Can be found in the Account section of the website.
 * @param {string} code - Sharecode generated on PiShock.com. Limitations can be set when generating the code.
 * @param {string} Name - Name of what sent the commands. This will showup in the PiShock logs on the website.
 * @returns {Shocker} - A new Shocker object
 * @example
 * const shocker = new Shocker('theravenseb', 'hfsjifh39235023-scdjuevfreidc', 'ABCDEFG', 'TEST_BOT');
 */
module.exports.default = class Shocker {
  constructor(username, Apikey, code, Name) {
    this.Username = username
    this.Apikey = Apikey
    this.Code = code
    this.Name = Name
    
  }

  /**
   * @method info
   * @description This method is used to get the information of the device
   * @returns {string} - Returns the information of the device
   * @example
   * shocker.info()
   * 
   */
  info() {
    const body = {
            Username:this.Username,
            Apikey:this.Apikey,
            Code:this.Code,
            Name:this.Name

    }

    fetch("https://do.pishock.com/api/GetShockerInfo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }
        
    ).then((res) => res.json()).then((data) => {
      return console.log(data)})
  }
/**
 * 
 * @param {Number} Intensity 
 * @param {Number} Duration 
 * @returns {String} - Returns the response from the server
 * @example
 * shocker.beep(100, 2)
 * 
 * 
 */
  beep(Intensity, Duration) {
    if (Intensity < 0 || Intensity > 100) {
      return console.error('Intensity must be between 0 and 100')
    }
    if (Duration < 0 || Duration > 10) {

        return console.error('Duration must be between 0 and 10')
    }


    const body ={
        Username:this.Username,
         Apikey:this.Apikey,
            Code:this.Code,
            Name:this.Name,
            Intensity:Intensity,
            Duration:Duration,
            Op:2

    }
    fetch(data.OperateURL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }
        
    ).then((res) => res.text()).then((data) => {
       return console.log(data)})

    
  }

  shock(Intensity, Duration) {
    if (Intensity < 0 || Intensity > 100) {
      return console.error('Intensity must be between 0 and 100')
    }
    if (Duration < 0 || Duration > 10) {

        return console.error('Duration must be between 0 and 10')
    }
    const body ={
        Username:this.Username,
         Apikey:this.Apikey,
            Code:this.Code,
            Name:this.Name,
            Intensity:Intensity,
            Duration:Duration,
            Op:0

    }
    fetch(data.OperateURL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }
        
    ).then((res) => res.text()).then((data) => {
       return console.log(data)})

    
  }

  vibrate(Intensity, Duration) {
    if (Intensity < 0 || Intensity > 100) {
      return console.error('Intensity must be between 0 and 100')
    }
    if (Duration < 0 || Duration > 10) {

        return console.error('Duration must be between 0 and 10')
    }
    const body ={
        Username:this.Username,
         Apikey:this.Apikey,
            Code:this.Code,
            Name:this.Name,
            Intensity:Intensity,
            Duration:Duration,
            Op:1

    }
    fetch(data.OperateURL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }
        
    ).then((res) => res.text()).then((data) => {
       return console.log(data)})

    
  }


  
  buzz(Intensity, Duration) {
    this.vibrate(Intensity, Duration)



}
}





// SECTION - Class assignment
