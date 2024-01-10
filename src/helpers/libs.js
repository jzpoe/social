const helpers ={};

helpers.randomNumer=()=>{
    const possible = 'abcdefghijklmnopqrstvwxyz1234567890'
    let randomNumer = 0;
    for(let i=0; i<5; i++){
    randomNumer += possible.charAt(Math.floor(Math.random()*possible.length))
}
return randomNumer
}


module.exports = helpers 

