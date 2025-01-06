//class file for Shocker
const data = require('./data/uri.js')
require('dotenv').config()




/**
 * @class Shocker
 * @classdesc This class is used to create a new Shocker object
 * 
 * @returns {Shocker} - A new Shocker object
 * @example
 * const shocker = new Shocker();
 */
module.exports.default = class Shocker {
  constructor() {
    this.Username = process.env.Username
    this.Apikey = process.env.Apikey
    this.Code = process.env.Code
    this.Name = process.env.Name
    this.Logverbose = process.env.Logverbose
    
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

    fetch(data.InfoURL, {
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
