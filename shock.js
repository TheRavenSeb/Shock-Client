const readline = require('readline');
const fs = require('fs');
const path = require('path');

require('dotenv').config();


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }

    const apikey =  process.env.API_KEY
    const username = "theravenseb"
    const code = "302787348E7"
    const namen = "gaurdian"
    const body ={

        Username:username,
         Apikey:apikey,
         Code:code,
         Name:namen,
         Intensity:null,
         Duration:null
     }


    function ask(){

        rl.question('enter command: ', async (answer) => {

            if(answer === 'shock'){
                body.Intensity = 20
                body.Duration = 2
                fetch("https://do.pishock.com/api/apioperate",{
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(body)
                }
                    
                
                ).then((res) => res.text()).then((data) => {
                    console.log(data)})
                    body.Intensity = null
                    body.Duration = null
                    ask()
                                }

                if(answer === "sit"){
                    for (let i = -1; i <= 100; i++) {
                        await sleep(250);
                        body.Intensity +=1
                    body.Duration = 2
                    fetch("https://do.pishock.com/api/apioperate",{
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
                        ask()
                }
                else{
                    console.log("not a command")
                    ask()
                }
                
    }
    )}
    ask()