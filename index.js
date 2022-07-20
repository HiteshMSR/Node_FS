import express from "express";
import fs from "fs";
import dotenv from "dotenv"

dotenv.config();

const app = express()
const PORT=process.env.PORT
app.get('/', function (req, res) {
  res.send('Hello World')
})

//we are creating a filewith currenttime as name and time as data in file.
app.get("/createfile", (req, res) => {
    const { fileName, timestamp } = getFileDate();
    fs.writeFile(`./${fileName}.txt`,timestamp, (err) => {
      if (err) console.lor(err);
      else console.log("file created" + fileName);
    });
    res.send(`file Created with name ${fileName}.txt with content ${timestamp}`);
  });

  //we are retreiving the files in the given path once user select this path.
app.get("/retreivefiles",(req,res)=>{

    fs.readdir('./',(err,files)=>{
        if (files.length == 0) {
            res.send("No files in directory");
          } else {
            let fileList = "Files in directory are<br>";
            files.forEach((file) => {
              fileList += file + "<br>";
            });
            res.send(fileList);
          }

    })



})
  

app.listen(PORT,()=>{console.log(`App started in ${PORT}`)})


function getFileDate() {
  
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hrs = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    var timestamp = hrs+"hrs"+minutes+"mins"+seconds+"secs";
    let fileName =
      date + "-" + month + "-" + year + " " + hrs + "_" + minutes + "_" + seconds;
  
    return { fileName, timestamp };
  }





// const fs=require("fs");

// var now = new Date();
// console.log((typeof now.getDate()), now.getFullYear());

// const data='Time is'+now.getTime()
// fs.writeFile(now.getDate()+"-"+now.getMonth() +"-"+ now.getFullYear() +"-"+ now.getHours() 
// +":"+ now.getMinutes()+".txt",data,(err)=>{
//     console.log("completed")
// })


  