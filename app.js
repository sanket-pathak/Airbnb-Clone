const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/airbnb";
const Listing = require("./models/listing");
const path = require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.listen(8080, (req, res)=>{
app.use('/static', express.static(path.join(__dirname, 'public')))

console.log("Listening on port 8080");
});

app.get("/", (req, res)=>{
    console.log("Hi I'm root");
})

async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
.then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

// app.get("/testListing", async(req, res)=>{
//     let sampleListing = new Listing({
//         title: "My Home",
//         description: "By the road",
//         image: {
//             url:"",
//             filename: "",
//         },
//         price: "1200",
//         location: "calangute",
//         country: "India",
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Succesful testing");
// });

app.get("/listings",async (req, res)=>{
    const allListings = await Listing.find({});
    console.log(allListings);
    res.render("./listings/index.ejs", {allListings});
}); 

app.get("/listings/:id", async (req, res)=>{
    let {id} = req.params;
    let item = await  Listing.findById(id);
    // console.log(item);
    res.render("./listings/show.ejs", {item});
});
