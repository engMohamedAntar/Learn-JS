const http= require("node:http");

const server=http.createServer((req,res)=>{
    console.log("req_url: ",req.url);
    if(req.url==="/")
        res.end("Home page");
    else if (req.url==="/about")
        res.end("About section");
    else
        res.end("Not found ");
});

server.listen(3001,()=>{
    console.log("listening on port 3001");
})

