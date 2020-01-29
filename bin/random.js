#!/usr/bin/env node
const base = require('./index')

const request = require("request");

request('https://fourtytwowords.herokuapp.com/words/randomWord?api_key='+`${api_key}`,(err,res, body)=>{
    console.log(body);
})