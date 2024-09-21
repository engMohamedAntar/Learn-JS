const http= require("node:http");
const fs= require("node:fs");

const homePage= fs.readFileSync("./homePage.html");
const styleFile= fs.readFileSync("./style.css");

const server = http.createServer((req, res) => {
    if(req.url==="/")
        res.write(homePage);
    else if(req.url==="/style.css")
        res.write(styleFile);
    else if(req.url==="/contacts")
        res.write("contacts");
    else
    {
        res.statusCode=404;
        res.write("Not found page");
    }
    res.end();
});


server.listen(5000, () => {
  console.log("listing to port 5000");
});
