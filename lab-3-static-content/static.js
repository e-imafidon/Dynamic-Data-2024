//Setup our server
//Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP)
const http = require('http') //Puts the required module into a contant called http
//In order to access local files, we need to work with the file system
const fs = require("fs")
//Define the port the app will be access from (80,8080,8888 are default to the domain /)
const PORT = process.env.PORT || 8080;
// The HTTP module can create an HTTP server that listens to server 

// the callback is a function which executes after something else has completed
//syntax to create a function 
const functionName = (parameter1, parameter2,paremeter3) => {
    //write the code to be executed by the function
    console.log("functinName was called")
    console.log(parameter1)
    console.log(parameter2)
    console.log(parameter3)
}
//Create a function to read files and display them 
const displayPage = (path,res,contentType, responseCode = 200) => {
    fs.readFile(__dirname + path , (errors, content) => {
        if(errors){
            res.writeHead(500,{'Content-type':'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode,{"Content-Type" : contentType})
        res.end(content)
    })       
 }
 // "/public/home.html"
 
// Use the createServer() method to create an HTTP server:
const server = http.createServer( (request,response) => {
    console.log(request.url)
    console.log(request.method) 

    //How to handle requests 
    var path = request.url
    //ROUTING
    switch(path) {
        case '':
        case '/':
        displayPage('/public/home.html',response,'text/html')   
        break
        case '/about':
        displayPage('/public/about.html',response,'text/html')
        break
        case '/contact':
        displayPage('/public/contact.html',response,'text/html') 
        break
        case '/logo':
        displayPage('/public/image.jpg',response,'image/jpg') 
        break
        case '/saturday':
        displayPage('/public/saturday.jpg',response,'image/jpg') 
        break
        default:
        displayPage('/public/404.html',response,'text/html',404)
        break
     }
     

    console.log("Responding to request")
    
})

//start the server 
server.listen(PORT, () => console.log(`server started on port http://localhost:${PORT}  press ctrl + c to stop` ))


//server.listen(PORT)`