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
    response.render('landing',{
        gallery,
        title:"This is Miami!!",
        abstract:"Miami is a fun place.",
        image:"miamisky.jpg"
    })
})
app.get('/about',(request,response)=>{
    response.render('page',{
        title:"About Miami",
        abstract:"From the Miami Marlins to the Miami Heat, there's a lot to see. "
    })
})

app.get('/nightlife',(request,response)=>{
    response.render('page',{
        title:"Miami at Night",
        abstract:"Stay away from South Beach!!"
    })
})

/*These are page templates
app.get('/nightlife',(request,response)=>{
    response.type('text/plain')
    response.send('Stay away from South Beach!! ')
})
*/
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
