#!/usr/bin/env node
const base = require('./index')
const chalk = require("chalk");
const request = require("request");
var myArgs = process.argv.slice(2);

if(typeof myArgs[0] != 'undefined')
{
    switch(myArgs[0]){
        case('defn'):
            defnFunction(myArgs[1]).then(res=>{
                defnDisplay(res); 
            })
            break
        case('syn'):
            synFunction(myArgs[1]).then(res=>{
                synDisplay(res);
            })
            break
        case('ant'):
            antFunction(myArgs[1]).then(res=>{
            antDisplay(res);
            });
            break
        case('ex'):
            exampleFunction(myArgs[1]).then(res=>{
                exampleDisplay(res);
            });
            break
        case('play'):
            gamePlay();
            break
        default:
            // Full Dictionary
            word = myArgs[0];
            fullDict(word);
                    
            break
        }
    }
else{
    // Word of the Day
    randomFunction().then(word=>{
        console.log(chalk.bold.underline.bgGreen("WORD OF THE DAY"))
        console.log(word);        
        defnFunction(word).then(res=>{
        defnDisplay(res);
            }).then(
                synFunction(word).then(res=>{
            synDisplay(res);
                }).then(
                    antFunction(word).then(res=>{
            antDisplay(res);
                    }).then(
                        exampleFunction(word).then(res=>{
            exampleDisplay(res);
                        }))))
    })
}

function fullDict(word) {
    defnFunction(word).then(res => {
        defnDisplay(res);
    }).then(synFunction(myArgs[0]).then(res => {
        synDisplay(res);
    }).then(antFunction(myArgs[0]).then(res => {
        antDisplay(res);
    }).then(exampleFunction(myArgs[0]).then(res => {
        exampleDisplay(res);
    }))));
}

// Game Play Logic
function gamePlay(){
    
}
// Display Functions

function defnDisplay(item) {
    console.log(chalk.bold.bgRed("DEFINITION"));    
    it = JSON.parse(item)
    it.forEach(elements => {
            console.log("")
            console.log(elements.text)
    });

}
function exampleDisplay(item) {
    console.log(chalk.bold.bgRed("EXAMPLE"));
    it = JSON.parse(item)
    //console.log(it)

    it.examples.forEach(elements => {
        console.log("")
                console.log(elements.text);
    });
}
function synDisplay(item) {
    console.log(chalk.bold.bgRed("SYNONYMS"));
    
    it = JSON.parse(item)
    //console.log(it)
    it.forEach(elements => {
            if(elements.relationshipType == "synonym")
            {
                elements.words.forEach(element => {
                    console.log("")
                    console.log(element);
                });
            }
    });
}
function antDisplay(item) {
    console.log(chalk.bold.bgRed("ANTONYMS"));
    it = JSON.parse(item)    
    //console.log(it)

    it.forEach(elements => {
        if(elements.relationshipType == "antonym")
        {
            elements.words.forEach(element => {
                console.log("")
                console.log(element);
            });
        }
    });
}

// Service Functions

function defnFunction(word) {
    return new Promise(resolve =>request(`${base.apihost}` + 'word/' + `${word}` + '/definitions?api_key=' + `${base.api_key}`, function (_err, _res, body) {
        setTimeout(() => {
            resolve(body);
          }, 500);
    })
    );
}
function synFunction(word) {
    return new Promise(resolve =>request(`${base.apihost}`+'word/' + `${word}` + '/relatedWords?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        setTimeout(() => {
            resolve(body);
          }, 1000);
    })
    );
}
function exampleFunction(word) {
    return new Promise(resolve =>request(`${base.apihost}` + 'word/' + `${word}` + '/examples?api_key=' + `${base.api_key}`,(_err,_res, body)=>{
        setTimeout(() => {
            resolve(body);
          }, 2000);
    })
    );
}
function randomFunction() {
    return new Promise(resolve =>request(`${base.apihost}`+'words/randomWord?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        b = JSON.parse(body)
        setTimeout(() => {
            resolve(b.word);
          }, 0);
    })
    );
}
function antFunction(word) {
    return new Promise(resolve =>request(`${base.apihost}`+'word/' + `${word}` + '/relatedWords?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        setTimeout(() => {
            resolve(body);
          }, 1500);
    })
    );
}

