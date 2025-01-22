//class file for Shocker
const data = require('./data/uri.js')
const functions = require('./data/functions.js')
require('dotenv').config()


//sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }


/**
 * @class Shocker
 * @classdesc This class is used to create a new Shocker object
 * 
 * @returns {Shocker} - A new Shocker object
 * @example
 * const shocker = new Shocker();
 */
module.exports.default =  class Shocker {
  constructor(config) {
    // Assign initial properties
    this.Username = config.Username;
    this.Apikey = config.Apikey;
    this.Code = config.Codes;
    this.Name = config.Name;
    this.Logverbose = config.Logverbose;
    this.IsSitEnabled = config.IsSitEnabled;
    this.HubName = config.HubName;
    this.WebSocket = new WebSocket(`${data.WebShocket}?Username=${this.Username}&ApiKey=${this.Apikey}`);
    
    
    this.WebSocket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      if(this.Logverbose >= 2){
      console.log(data);
      }
    };
    
    // Initialize listeners
    this.listeners = {};
    

  
    // Check for Sit Enabled warning
    if (this.IsSitEnabled) {
      console.warn("Sit Down Command enabled. This is a dangerous action. Please change IsSitEnabled:false");
    }
  
     // Initialize UserId and Devices asynchronously
     this.initialize().then(() => {
      this.ready = true;
      if(this.WebSocket.readyState === 1&& this.ready){

      this.emitReadyEvent();}
    });
  }
  on(event, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  emit(event, ...args) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        if (typeof cb === 'function') {
          cb(...args);
        } else {
          console.warn(`Skipping non-function callback for ${event}`);
        }
      });
    }
  }


  
  async initialize() {
    const UserId = await functions.getUserId(this.Username, this.Apikey);
    this.UserId = UserId;
    
    
    const Devices = await functions.getDevices(UserId, this.Apikey);
    this.Devices = Devices;
    const SharedDevices = await functions.getSharedDevices(UserId, this.Apikey);
    this.SharedDevices = SharedDevices;
  }

  emitReadyEvent() {
    // Emit a custom 'ready' event
    this.emit('ready');
  }
  emitShockEvent() {
    // Emit a custom 'shock' event
    this.emit('shock');
  }
  emitSitEvent() {
    // Emit a custom 'sit' event
    this.emit('sit');
  }
  emitErrorEvent() {
    // Emit a custom 'error' event
    this.emit('error');
  }

  emitVibrateEvent() {
    // Emit a custom 'vibrate' event
    this.emit('vibrate');
  }
  emitBeepEvent() {
    // Emit a custom 'beep' event
    this.emit('beep');
  }




  onEvent(event,callback) {
    // Add a listener for the 'ready' event
    this.on(event , callback);
    
  }

  

  ping() {

    this.WebSocket.send(JSON.stringify({ "Operation":"PING" }))
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
  beep(Name, Intensity, Duration, ShareCode = null) {
    if (Intensity < 0 || Intensity > 100) {
      return console.error('Intensity must be between 0 and 100')
    }
    if (Duration < 0 || Duration > 10) {

        return console.error('Duration must be between 0 and 10')
    }
    // send command to websocket to shock format

    //find the device by name
    
    var device = this.Devices.find((client => client.name === this.HubName))
    var target =`c${device.clientId}-ops`
    var shocker = this.Devices.find((client => client.clientId === device.clientId))
    var shockers = shocker.shockers.find((awa => awa.name === Name))
    var ty = 'api'
    if(shockers !== undefined){
    shockers = shocker.shockerId
    }
    if (ShareCode !== null){
      shockers = this.SharedDevices[Name][0]
      target =`c${device.clientId}-sops-${ShareCode}`
      ty = 'sc'
      
    }
    if (shocker === undefined){
      return console.error('Device not found')
    }

    const body = JSON.stringify({
      "Operation": "PUBLISH",
      "PublishCommands": [
      {
        "Target": target,
        "Body": {
        "id": shockers,
        "m": 'b',
        "i": Intensity,
        "d": Duration * 1000,
        "r": true,
        "l": {
          "u": this.UserId,
          "ty": ty,
          "w": false,
          "h": false,
          "o": this.Username
        }
        }
      }
      ]
    });
    
        this.WebSocket.send(body)
          this.emitBeepEvent()
  }

  shock(Name, Intensity, Duration,ShareCode = null) {
    if (Intensity < 0 || Intensity > 100) {
      return console.error('Intensity must be between 0 and 100')
    }
    if (Duration < 0 || Duration > 10) {

        return console.error('Duration must be between 0 and 10')
    }
    // send command to websocket to shock format 
    // find client id of device by name
    var device = this.Devices.find((client => client.name === this.HubName))
    var target =`c${device.clientId}-ops`
    var shocker = this.Devices.find((client => client.clientId === device.clientId))
    shocker= shocker.shockers.find((shocker => shocker.name === Name))
    if (ShareCode !== null){
      shocker = this.SharedDevices.find((client => client.clientId === device.clientId))
      target =`c${device.clientId}-sops-${ShareCode}`
      
    }
    if (shocker === undefined){
      return console.error('Device not found')
    }

    const body = JSON.stringify({
      "Operation": "PUBLISH",
      "PublishCommands": [
      {
        "Target": target,
        "Body": {
        "id": shocker.shockerId,
        "m": 's',
        "i": Intensity,
        "d": Duration * 1000,
        "r": true,
        "l": {
          "u": this.UserId,
          "ty": 'api',
          "w": false,
          "h": false,
          "o": this.Username
        }
        }
      }
      ]
    });

        this.WebSocket.send(body)
          this.emitShockEvent()
          
          
          
        
  }


  /**
   * 
   * @param {string} Name 
   * @param {Number} Intensity 
   * @param {Number} Duration 
   * @returns 
   */
  vibrate(Name,Intensity, Duration) {
    if (Intensity < 0 || Intensity > 100) {
      return console.error('Intensity must be between 0 and 100')
    }
    if (Duration < 0 || Duration > 10) {

        return console.error('Duration must be between 0 and 10')
    }
    // send command to websocket to shock format 
    var device = this.Devices.find((client => client.name === this.HubName))
    var target =`c{${device.clientId}}--ops`
    var shocker = this.Devices.find((client => client.clientId === device.clientId))
    shocker= shocker.shockers.find((shocker => shocker.name === Name))
    if (shocker === undefined){
      shocker = this.SharedDevices.find((client => client.clientId === device.clientId))
      
    }
    if (shocker === undefined){
      return console.error('Device not found')
    }

    const body = JSON.stringify({
      "Operation": "PUBLISH",
      "PublishCommands": [
      {
        "Target": target,
        "Body": {
        "id": shocker.shockerId,
        "m": 'v',
        "i": Intensity,
        "d": Duration * 1000,
        "r": true,
        "l": {
          "u": this.UserId,
          "ty": 'api',
          "w": false,
          "h": false,
          "o": this.Username
        }
        }
      }
      ]
    });

        this.WebSocket.send(body)
          this.emitVibrateEvent()
    
  }


   /**
   * 
   * @param {string} Name 
   * @param {Number} Intensity 
   * @param {Number} Duration 
   * @returns 
   */
  buzz(Name, Intensity, Duration) {
    this.vibrate(Name, Intensity, Duration)



}

async sitDown(Name, min =0, max = 100){
  if (this.IsSitEnabled){
  let Intensity;
  for (Intensity = min; Intensity <= max; Intensity++) {
    await sleep(250);
    
    var Duration = 2
    this.zap(Name, Intensity, Duration)
}

    
this.emitSitEvent()
}
else{

  return console.error("The SitDown function is not enabled please add IsSitEnabled:true to your config")
}

}


 zap(Name, Intensity, Duration){

  this.shock(Name, Intensity,Duration)
 } 


 getDevices(){
  return this.Devices
 }
}





// SECTION - Class assignment
