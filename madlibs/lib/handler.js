//Create a variable to store users that sign up 
let eList = require('../data/emails.json')
//To write or create we need node's file system fs
const fs = require('fs')
//create your functions
exports.newsletterSignup = (req,res) => {
    res.render('newsletter-signup', { csrf: 'supersecretcode'})
}
exports.newsletterSignupProcess = (req,res) => {
    console.log(req.body)
    // To store the data: 
    //First create a new user variable 
    var newUser = {
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "address": req.body.address,
        "city":req.body.city,
        "state":req.body.state,
        "zip":req.body.zip,
        "email":req.body.email
    }
    console.log("Cleaned user")
    console.log(newUser)
    //Once we have aclean user, we add to the eList 
    eList.users.push(newUser)
    //We need to turn the eList values back into text in order to write 
    var json = JSON.stringify(eList)
    
    fs.writeFileSync('./data/emails.json',json,'utf8',()=>{
        console.log("finished writing file")
    })
    //eList.users.push(req.body)
    console.log("current eList")
    console.log(eList)
    //res.render('thankyou')
    res.redirect(303,'/newsletter/thankyou')
}

exports.newsletterSignupList = (req,res)=>{
    eList = require('../data/emails.json')
    console.log(eList)
    res.render('userspage',{"users":eList.users})
}

exports.newsletterUser = (req,res) => {
    
    var userDetails = eList.users.filter((user)=>{
        return user.email == req.params.email
    })

    res.render('userdetails',{"users":userDetails})
}

exports.newsletterUserDelete = (req,res) => {
    var newUsers = {"users":[]}
    
    newUsers.users = eList.users.filter((user)=>{
        return user.email != req.params.email
    })

    var json = JSON.stringify(newUsers)

    fs.writeFileSync('./data/emails.json',json,'utf8',()=>{
        console.log("finished writing file")
    })

    res.send('<a href="/newsletter/list">Go Back</a>')
    
}