// npm install express 
// npm install express-handlebars 
// sudo npm install express 
// sudo npm install express-handlebars 
//Initialize Express
const express = require('express')

//add the handlebars view engine 
const expressHandlebars = require('express-handlebars') 

const app = express()

// Add body-parser to process POST data from forms
const bodyParser = require('body-parser')
// Body-parser needs to be initialized
app.use(bodyParser.urlencoded({extended: true}))

//configure our express app to use handlebars
app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine','handlebars')
//ends handlebar configuration

//Import you handler files
const handler = require('./lib/handler')

const port = process.env.port || 3000
app.get("/",(req,res)=>{
    res.render('page',{req})
})

app.get("/mad",(req,res)=>{
    const data = require("./data/mad-data.json")
    res.render('madform',{data})
})

app.post('/process',(req,res)=>{
    res.send('got post')
    console.log(req.body)
})

app.get('/process',(req,res)=>{
    console.log(req.query)
})

app.get('/newsletter-signup', handler.newsletterSignup )

app.post('/newsletter-signup/process', handler.newsletterSignupProcess)

app.get('/newsletter/list',handler.newsletterSignupList)

app.get('/newsletter/thankyou', (req,res)=>{
    res.render('thankyou')
})
//newslleter/details/?email=jshdgfj@kjhskhdfkjh.com
app.get('/newsletter/details/:email',handler.newsletterUser)
app.get('/newsletter/delete/:email',handler.newsletterUserDelete)

//Error handling ->  app.use() basic express route 
app.use((req,res) => {
    res.status(404)
    res.render('404')
})

//Server Error 500
app.use((error,req,res,next) => {
    console.log(error.message)
    res.status(500)
    res.render('500') 
}) 

// setup listener
app.listen(port,()=>{
    console.log(`Server started http://localhost:${port}`)
    //console.log('Server starter http://localhost:'+port)
    console.log('To close pres Ctrl-C')
})