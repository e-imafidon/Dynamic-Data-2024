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
//Import app-wide data
const gallery = require("./data/gallery.json")
//process routes before error
app.get('/',(request,response)=>{
    console.log(gallery)
    //Import page-specific data
    const data = require("./data/home-data.json")
    response.render('landing',{
        gallery,
        data
    })
})

app.get('/historical',(request,response)=>{
    console.log(gallery)
    //Import page-specific data
    const data = require("./data/historical-data.json")
    response.render('landing',{
        data,
        gallery
    })
})

app.get('/culinary',(request,response)=>{
    console.log(gallery)
    //Import page-specific data
    const data = require("./data/culinary-data.json")
    response.render('landing',{
        data,
        gallery
    })
})

app.get('/outdoor',(request,response)=>{
    console.log(gallery)
    //Import page-specific data
    const data = require("./data/outdoor-data.json")
    response.render('landing',{
        data,
        gallery
    })
})

app.get('/nightlife',(request,response)=>{
    console.log(gallery)
    //Import page-specific data
    const data = require("./data/nightlife-data.json")
    response.render('landing',{
        data,
        gallery
    })
})

/*These are page templates
app.get('/nightlife',(request,response)=>{
    response.type('text/plain')
    response.send('Stay away from South Beach!! ')
})
app.get('/beaches',(request,response)=>{
    response.type('text/plain')
    response.send('Miami Beach and more!')
})
*/
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
