

request('https://fourtytwowords.herokuapp.com/word/'+`${options.name}`+'/definitions?api_key='+`${api_key}`,function(err,res,body){
    console.log("hello");
    
console.log(body);

})