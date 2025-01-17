//class file for Shocker
const data = require('./data/uri.js')
const functions = require('./data/functions.js')
require('dotenv').config()





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
    this.WebSocket = new WebSocket(`${data.WebShocket}?Username=${this.Username}&ApiKey=${this.Apikey}`);
    
    
    this.WebSocket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      console.log(data);
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
  }

  emitReadyEvent() {
    // Emit a custom 'ready' event
    this.emit('ready');
  }
  emitShockEvent() {
    // Emit a custom 'shock' event
    this.emit('shock');
  }


  onEvent(event,callback) {
    // Add a listener for the 'ready' event
    this.on(event , callback);
    
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

  shock(Name, Intensity, Duration) {
    if (Intensity < 0 || Intensity > 100) {
      return console.error('Intensity must be between 0 and 100')
    }
    if (Duration < 0 || Duration > 10) {

        return console.error('Duration must be between 0 and 10')
    }
    // send command to websocket to shock format 
    var target =`c{${this.Devices[0].clientId}}--ops`
    var shocker = this.Devices.find((client => client.clientId === this.Devices[0].clientId))
    shocker= shocker.shockers.find((shocker => shocker.name === Name))
    if (shocker === undefined){
      return console.error('Device not found')
    }

    const body =JSON.stringify({
      Operation: "PUBLISH",
      PublishCommands: [
        {
          Target: target,
          Body: {
        id: shocker. shockerId,
        m: 's',
        i: Intensity,
        d: Duration * 1000,
        r: true,
        l: {
          u: this.UserId,
          ty: 'api',
          w: false,
          h: false,
          o: this.Username
        }
          }
        }
      ]
        });

        this.WebSocket.send(body)
          this.emitShockEvent()
          
          
          
        
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


 getDevices(){
  return this.Devices
 }
}





// SECTION - Class assignment
