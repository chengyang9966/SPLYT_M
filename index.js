const express=require('express');
const axios = require('axios');
const ProxySetup=require('./middleware/Proxy').ProxySetup
const dotenv = require('dotenv');
const cors = require('cors');
const app=express();

if(process.env.NODE_ENV !=='Production'){
    
    require('dotenv').config();
}

app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.get('/api/getLocation',ProxySetup,(req,res)=>{
    let URLString=process.env.ALLTAXIURL
    URLString= URLString.replace('{{lat}}',req.query.lat)
    URLString= URLString.replace('{{lng}}',req.query.lng)
    URLString= URLString.replace('{{count}}',req.query.count)
    if(!req.query.lat){
        res.status(400).json({
            message:'Latitute is Required'
        })
    }
    if(!req.query.lng){
        res.status(400).json({
            message:'longitude is Required'
        })
    }
    
    axios.get(URLString).then(respone=>{
        res.status(200).json(respone.data)
    }).catch(error => {
        console.log(error);
      });

})




app.listen(process.env.PORT||6400,()=>console.log(`App listen at ${6400}`))