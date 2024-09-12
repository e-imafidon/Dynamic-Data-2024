//setup our server
const http = require('http')

//JavaScript Object Notation AKA JSON
var printer = {
    color:"black",
    size:"small",
    price:29.99
} 
//accessing printer color = printer.color

//define the port the app will be accessed from 
const PORT = process.env.PORT || 8080
//the HTTP module can create an HTTP server that listens to server 

// the callback is a function which executes after somethting else has completed

//use the createServer() mthod to create an HTTP server:
const server = http.createServer((request,response) => {
    console.log("*********************************************")
    console.log("*********************************************")

    console.log(request.url)
    console.log(request.method)
    //GET POST PUT DELETE
    //GET => READ OPERATION OF A DATABASE
    //POST => CREATE "" ""
    //PUT => UPDATE
    //DELETE => DELETE
    //server response codes
    //https response status codes

    //How to handle to requests
    //ROUTING
    if(request.url == "/"){
        //execute the statement
        response.writeHead(200,{'Content-Type':'text/plain'})
        response.end('Home Page')
    }

    else if(request.url == "/contact"){
        //execute the statement
        response.writeHead(200,{'Content-Type':'text/plain'})
        response.end('Contact Page')
    }

    else if(request.url == "/about"){
        //execute the statement
        response.writeHead(200,{'Content-Type':'text/plain'})
        response.end('About Page')
    }

    else if(request.url == "/gallery"){
        //execute the statement
        response.writeHead(200,{'Content-Type':'text/HTML'})
        response.end('<html><head><title>Page Title</title></head><body><h1>My first HTML response</h1></body></html>')
    } else{
        response.writeHead(400,{'Content-Type':'text/plain'})
        response.end('Page not found error 400')

    }
    //switch statement: ise slides dile 

    //Basic Conditions 
    /**
     * Equals: == if a == b(Equals sign twice because = by itself is an 
     * assignment operator)
     * Not Equal: if a != b
     * Greater than: if a > b 
     * Less than: if a < b
     * Greater than or equal: if a >= b
     * Less than or equal: if a <= b
     */

    console.log("Responding to request")

    console.log("*********************************************")
    console.log("*********************************************")
})
//.createServer() in a function that takes in 2 argumentsç

//start the server
server.listen(PORT, ()=> console.log(`server started on port http://localhost:${PORT} press Ctrl-C to terminate.....`))



