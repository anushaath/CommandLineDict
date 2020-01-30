#!/usr/bin/env node
const base = require('./index')
const chalk = require("chalk");
const request = require("request");
var myArgs = process.argv.slice(2);

if(typeof myArgs[0] != 'undefined')
{
    switch(myArgs[0]){
        case('defn'):
            defn = defnFunction(myArgs[1]);
            defnDisplay(defn);
            break
        case('syn'):
            syn = synFunction(myArgs[1]);
            synDisplay(syn);
            break
        case('ant'):
            ant = antFunction(myArgs[1]);
            antDisplay(ant);
            break
        case('ex'):
            ex = exampleFunction(myArgs[1]);
            exampleDisplay(ex);
            break
        case('play'):
            consoleDisplay(defn,"play");
            break
        default:
            // Full Dictionary
            word = randomFunction();
            defn = defnFunction(word);
            defnDisplay(defn);
            syn = synFunction(myArgs[1]);
            synDisplay(syn);
            ant = antFunction(myArgs[1]);
            antDisplay(ant);
            ex = exampleFunction(myArgs[1]);
            exampleDisplay(ex);
            break
        }
    }
else{
    // Word of the Day
    
}

// Display Functions

function defnDisplay(item) {
    item.forEach(elements => {
            console.log(elements.text);
    });
}
function exampleDisplay(item) {
    item.forEach(elements => {
            elements.examples.forEach(example => {
                console.log(example.text);
            });
    });
}
function synDisplay(item) {
    item.forEach(elements => {
            if(elements.relationshipType == "synonym")
            {
                elements.words.forEach(element => {
                    console.log(element);
                });
            }
    });
}
function antDisplay(item) {
    item.forEach(elements => {
        if(elements.relationshipType == "antonym")
        {
            elements.words.forEach(element => {
                console.log(element);
            });
        }
    });
}

// Service Functions

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

