

const express = require('express');
const config = require('./server/config')

const app= config(express())
require('./database')

app.listen(app.get('port'), ()=>{
    console.log('listening on port',app.get('port'))
})
