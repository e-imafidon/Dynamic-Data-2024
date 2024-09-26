// imports express into our project 
const express = require('express') 
//create the express server inside a variable called app
const app = express()
//Specify static routes
app.use(express.static('public'))

// import a package for handlebars
const expressHandlebars = require('express-handlebars')
// make express use the handlebars template engine
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine','handlebars')

const PORT = process.env.port || 3000
//process routes before error
app.get('/',(request,response)=>{
    response.render('home')
})
app.get('/about',(request,response)=>{
    response.render('about')
})
app.get('/nightlife',(request,response)=>{
    response.type('text/plain')
    response.send('Miami At Night')
})
app.get('/beaches',(request,response)=>{
    response.type('text/plain')
    response.send('Miami Beach and more!')
})
//this triggers a server error
app.get('/history',(req,res)=>{
    response.type('text/plain')
    response.send('History of Miami')
})
//Handle the error first
//NOT FOUND!
app.use((request,response)=>{
    response.status(404)
    response.render('404')
 })

 //SERVER ERROR :(
 app.use((error,request,response,next)=>{
    console.log(error.message)
    response.status(500)
    response.render('500')
 })

 app.listen(PORT, ()=>{
    console.log(`Express is running on http://localhost:${PORT} `)
    console.log('Press ctrl-c to terminate')
 })
