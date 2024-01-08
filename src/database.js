const mongoose = require ('mongoose') 
const {database} = require ('../keys')

mongoose.connect(database.URI, 
    
    )
.then(db=> console.log('connect database'))
.catch(err => console.error(err))