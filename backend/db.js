const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/?readPreference=primary&directConnection=true"

/*const connectToMongo =()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Mongooose connected successfully") 
    })
}*/
const server='127.0.0.1:27017';
const database='ar'

const connectToMongo=async()=>{
    try{
        await mongoose.connect(`mongodb://${server}/${database}`);
        console.log("MONGO DB CONNECTED SUCCESFULLY");
    }catch(err){
        console.log("FAILED TO CONNECT TO MONGO DB",err);
    }
};

module.exports = connectToMongo;