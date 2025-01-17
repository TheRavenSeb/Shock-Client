module.exports ={
    /**
     * @description Stops the program for a set amount of time
     * @param {Number} ms 
     * @returns Promise
     */
    sleep:function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
        }



}