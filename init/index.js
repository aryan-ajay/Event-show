const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main(){
    await mongoose.connect(MONGO_URL);
}
main().then(()=> {
    console.log("Database connected!");
}).catch((err)=> {
    console.log(err);
});

let initDB = async ()=> {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=> ({...obj, owner: "664ddf0c6a6a4b9700f86fac"}));
    await Listing.insertMany(initData.data);
    console.log("Data was inited")
}

initDB();