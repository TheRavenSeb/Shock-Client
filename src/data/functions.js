
const uri = require('./uri.js')
module.exports ={
    /**
     * @description Stops the program for a set amount of time
     * @param {Number} ms 
     * @returns Promise
     */
    sleep:function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
        },

    getUserId: async function checkVaildApi(Username, Apikey){
        let result
        await fetch(`${uri.Vaild}?apikey=${Apikey}&username=${Username}`).then((res) => res.json()).then((data) => {
          result = data.UserId
           
        }

        )
        return result

    },
    getSharedDevices: async function getSharedDevices(UserId, Apikey){
        let result
        await fetch(`${uri.SharedDevicesURL}?UserId=${UserId}&Token=${Apikey}&api=true`).then((res) => res.json()).then((data) => {
            result = data
        })
        return result
    },

    getDevices: async function getDevices(UserId, Apikey){
        let result
        await fetch(`${uri.DeviceURL}?UserId=${UserId}&Token=${Apikey}&api=true`)
        .then((res) => res.json()).then((data) => {
            result = data
        })
        return result
    }





}