#!/usr/bin/env node

const yargs = require("yargs");
const express=require('express');
const request = require("request");

var app=express();
const apihost = "https://fourtytwowords.herokuapp.com/"
const api_key="b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164";

exports.apihost = apihost;
exports.api_key = api_key;

const options = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv;

const greeting = `Hello, ${options.name}!`;



console.log(greeting)