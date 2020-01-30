#!/usr/bin/env node
const base = require('./index')

const request = require("request");
var myArgs = process.argv.slice(2);

switch(myArgs[0]){
case('defn'):
    defFunction();
    break
case('syn'):
    synFunction();
    break
case('ant'):
    break
case('ex'):
    break
case('play'):
    break
default:
    break
}

if(!myArgs[0])
{
    request(`${base.apihost}`+'words/randomWord?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        console.log(body);
    })
}

function defFunction() {
    request(`${base.apihost}` + 'word/' + `${myArgs[1]}` + '/definitions?api_key=' + `${api_key}`, function (_err, _res, body) {
        console.log(body);
    });
}
function synFunction() {
    request(`${base.apihost}`+'words/randomWord?api_key='+`${base.api_key}`,(_err,_res, body)=>{
        console.log(body);
    });
}
function exampleFunction() {
    request(`${base.apihost}` + 'word/' + `${myArgs[1]}` + '/examples?api_key=' + `${api_key}`,(_err,_res, body)=>{
        console.log(body);
    });
}


