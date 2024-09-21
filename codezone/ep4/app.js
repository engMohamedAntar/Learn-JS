const express= require("express");
const app=express();

const morgan= require("morgan");
app.use(morgan("dev"));

app.get("/",(req,res)=>{
  res.send("this is home page");
})
app.get("about",(req,res)=>{
  res.send("this is about page");
})
app.get("/products",(req,res)=>{
  res.send( [{product1:"p1"},{product1:"p2"}]);
})

app.listen(5000,()=>{
  console.log("listing to port 5000");
})