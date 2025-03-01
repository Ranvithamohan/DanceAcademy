const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const bodyparser = require("body-parser")
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


//define mongoose schemaa 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    description: String
  });

  const contact = mongoose.model('contact', contactSchema);







//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'))   //for serving static file
app.use(express.urlencoded())

//PUG SPECIFIC STUFF
app.set('view engine', 'pug')   //set the tenplate engine as pug
app.set('views',path.join(__dirname,'views'))  //set the view directory


//END POINTS
app.get('/',(req,res)=>{
    
    const params = {};
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=>{
    
    const params = {};
    res.status(200).render('contact.pug',params);

})
app.post('/contact',(req,res)=>{
    
    var mydata = new contact(req.body);
    mydata.save().then(()=> {
        res.send("this item is saved to database")
    }).catch(()=>{
        res.status(400).send("item is not added to the database")
    });
    // res.status(200).render('contact.pug');

})

app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
});

app.get('/classinfo', (req, res) => {
    res.status(200).render('classinfo.pug');
});

app.get('/services', (req, res) => {
    res.status(200).render('services.pug');
});



//START THE SERVER
app.listen(port,() => {
    console.log(`loaded successfully at ${port} `);
})