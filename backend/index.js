const connectToMongo= require('./db');
const express = require('express')

var cors = require('cors')
var app = express()

app.use(cors())

connectToMongo();

const port = 5000

app.use(express.json())
/*app.get("/",(req,res)=>{
  res.send("AAYUCLOUD")
})
*/
//AVAILABLE ROUTES
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Aayucloud backend listening on port http://localhost:${port}`)
})