#!/usr/bin/env node
const base = require('./index')

const request = require("request");
var myArgs = process.argv.slice(2);

if(myArgs[0] in ["defn","syn","ant","ex","play"])
{
    switch(myArgs[0]){
        case('defn'):
            defn = defnFunction(myArgs[1]);
            consoleDisplay(defn,"defn");
            break
        case('syn'):
            syn = synFunction(myArgs[1]);
            consoleDisplay(syn,"syn");
            break
        case('ant'):
            ant = antFunction(myArgs[1]);
            consoleDisplay(defn,"ant");
            break
        case('ex'):
            ex = exampleFunction(myArgs[1]);
            consoleDisplay(defn,"ex");
            break
        case('play'):
            consoleDisplay(defn,"play");
            break
        default:
            break
        }
    }
else{
    // Full Dictionary
    word = randomFunction();
    defn = defnFunction(word);
    consoleDisplay(defn,"defn");
    syn = synFunction(myArgs[1]);
    consoleDisplay(syn,"syn");
    ant = antFunction(myArgs[1]);
    consoleDisplay(defn,"ant");
    ex = exampleFunction(myArgs[1]);
    consoleDisplay(defn,"ex");
}

function consoleDisplay(item, fun) {
    item.forEach(elements => {
        if(fun=="defn")
        {
            console.log(elements.text);
        }
        else if (fun=="syn")
        {
            if()
        }
        else if (fun=="ant")
        {

        }
        else if (fun=="ex")
        {

        }
    });
}

function defnFunction(word) {
    request(`${base.apihost}` + 'word/' + `${word}` + '/definitions?api_key=' + `${api_key}`, function (_err, _res, body) {
        console.log(body);
        return body
    });
}
function synFunction(word) {
    request(`${base.apihost}`+'word/' + `${word}` + 'relatedWords?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        console.log(body);
        return body
    });
}
function exampleFunction(word) {
    request(`${base.apihost}` + 'word/' + `${word}` + '/examples?api_key=' + `${api_key}`,(_err,_res, body)=>{
        console.log(body);
        return body
    });
}
function randomFunction() {
    request(`${base.apihost}`+'words/randomWord?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        console.log(body);
        return body.word;
    });
}
function antFunction(word) {
    request(`${base.apihost}`+'word/' + `${word}` + 'relatedWords?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        console.log(body);
        return body
    });
}

