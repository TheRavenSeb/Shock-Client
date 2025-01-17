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
  constructor(config) {
    this.Username = config.Username
    this.Apikey = config.Apikey
    this.Code = config.Codes
    this.Name = config.Name
    this.Logverbose = config.Logverbose
    this.IsSitEnabled
    if(this.IsSitEnabled){
      console.warn("Sit Down Command enabled this is a damgerous action to disable please change IsSitEnabled:false")
    }
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
    var returnData = ''
    const body = {
            Username:this.Username,
            Apikey:this.Apikey,
            Code:null,
            Name:this.Name

    }
    console.log(body)
    for (var codes in this.Code ){
        body.Code = codes
    fetch(data.InfoURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }
        
    ).then((res) => res.json()).then((data) => {
        returnData += data
        
      })
    }
    return returnData}
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

async sitDown(){
  if (this.IsSitEnabled){
  const body ={
    Username:this.Username,
     Apikey:this.Apikey,
        Code:this.Code,
        Name:this.Name,
        Intensity:0,
        Duration:2,
        Op:1

}
  for ( body.Intensity = 0; body.Intensity <= 100; i++) {
    await sleep(250);
    body.Intensity +=1
    body.Duration = 2
    fetch(data.OperateURL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    }
    

).then((res) => res.text()).then((data) => {
})
}

    body.Intensity = null
    body.Duration = null
    return console.log("Sit Complated")
}
else{

  return console.error("The SitDown function is not enabled please add IsSitEnabled:true to your config")
}
}


 zap(Intensity, Duration){

  this.shock(Intensity,Duration)
 } 
}





// SECTION - Class assignment
