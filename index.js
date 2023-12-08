const express = require('express');
const app = express();
const fs = require('fs');
app.use(express.json());
app.post('/add',(req,res)=>{
    let data = fs.readFileSync("datauser.txt","utf8");
    if(data===""){
    req.body.id = 0;
    fs.writeFileSync("datauser.txt",JSON.stringify([req.body]));}
    else{
    data = JSON.parse(fs.readFileSync("datauser.txt","utf8")); 
    req.body.id = data[data.length-1].id+1;
    data.push(req.body);
    fs.writeFileSync("datauser.txt",JSON.stringify(data));
    res.send("Все получилось");}
});
app.get('/user/:id',(req,res)=>{
    const data = JSON.parse(fs.readFileSync("datauser.txt","utf8"));
    res.send(data[req.params.id]);
});
app.put('/user/:id',(req,res)=>{
    const data = JSON.parse(fs.readFileSync("datauser.txt","utf8"));
    Object.assign(data[req.params.id],req.body);
    fs.writeFileSync("datauser.txt",JSON.stringify(data));
    res.send("Все получилось");

});
app.delete('/user/:id',(req,res)=>{
    const data = JSON.parse(fs.readFileSync("datauser.txt","utf8"));
    let user = JSON.stringify( data[req.params.id]);
    let str = JSON.stringify(data);
    console.log(user);
   let str1 =  str.replace(user,"");
   console.log(str1);
    str1 = str1.replace(",]","]");
    str1 = str1.replace(",,",",");
    str1 = str1.replace("[,","[");
    console.log(str1);
    fs.writeFileSync("datauser.txt",str1);
    res.send("Все получилось");});
app.listen(3000);