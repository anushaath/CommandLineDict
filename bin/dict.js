#!/usr/bin/env node
const base = require('./index')
const chalk = require("chalk");
const request = require("request");
const inquire = require('inquirer');
const figlet = require("figlet");
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
    }).then(synFunction(word).then(res => {
        synDisplay(res);
    }).then(antFunction(word).then(res => {
        antDisplay(res);
    }).then(exampleFunction(word).then(res => {
        exampleDisplay(res);
    }))));
}

// Game Play Logic
function gamePlay(){
    console.log(chalk.yellow(
              figlet.textSync('Word Game', { horizontalLayout: 'full' })
            )
          );
    console.log(chalk.cyan.inverse.bold("Welcome to the Game!"))
    console.log(chalk.yellow("In this game, you will need to guess the word, from the given clues."+chalk.bold(" WE BEGIN!")));
    randomFunction().then(word=>{
        defnFunction(word).then(defn=>{
            def = JSON.parse(defn)
            console.log(chalk.red.underline("DEFINITION"))
            console.log(def[0].text)
        }),
                setTimeout(()=>{
                            guess(word)
                        },1500)
                    
        
        

    })
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
          }, 100);
    })
    );
}
function synFunction(word) {
    return new Promise(resolve =>request(`${base.apihost}`+'word/' + `${word}` + '/relatedWords?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        setTimeout(() => {
            resolve(body);
          }, 500);
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

// Game Helper functions

function shuffle(s) {
    var arr = s.split('');           // Convert String to array
    var n = arr.length;              // Length of the array
    
    for(var i=0 ; i<n-1 ; ++i) {
      var j = Math.floor(Math.random() * n);       // Get random of [0, n-1]
      
      var temp = arr[i];             // Swap arr[i] and arr[j]
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    s = arr.join('');                // Convert Array to string
    return s;                        // Return shuffled string
  }

function guess(w)
{
    inquire
    .prompt([
        {
        type: 'input',
        name: 'userGuess',
        message: 'Guess the word!',
        validate: function( value ) {
            if (value.length) {
              return true;
            } else {
              return 'Guess the word';
            }
          }
        }
    ]).then(answers=>{
        synFunction(w).then(syn=>{

        syJS = JSON.parse(syn)
        syJS.forEach(elements => {
                      if(elements.relationshipType == "synonym")
                       {
                            sy = elements.words
                        }
                        
                    })
        if(answers.userGuess == w)
        {
            console.log(chalk.green.bold("Wow! You got it right!"))
            process.exit()
        }
        else if(sy.includes(answers.userGuess))
        {
            console.log(chalk.yellow.bold("You guessed one of the synonyms! Well done!"))
            console.log(chalk.green("The actual word was "+w))
            process.exit()
        }
        else{
            console.log(chalk.red("Your answer was incorrect. You have three options"));
            options(w,sy)
        }
             
    })
    })
}

function options(w,sy){
    inquire.prompt([
        {
            type: 'rawlist',
            name: "opt",
            message: "Choose your option:",
            choices: ["Try Again","Give me a Hint", "Quit"]
        }
    ]
    ).then(answers=>{
        if (answers.opt == "Try Again")
        {
            guess(w)
        }
        else if (answers.opt == "Give me a Hint")
        {
            console.log(chalk.yellow("Here is a hint: A shuffle of the word"))
            console.log(shuffle(w))
            console.log(chalk.yellow("Here is another hint: A synonym of the word"))
            console.group(sy[0])
            guess(w)
        }
        else if (answers.opt == "Quit")
        {
            console.log(chalk.bgCyan("The word was: "+w));
            fullDict(w);
            
        }
    })
}