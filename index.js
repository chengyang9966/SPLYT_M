const express=require('express');
const axios = require('axios');
const ProxySetup=require('./middleware/Proxy').ProxySetup
const jwtTokenSign=require('./utils/jwtToken').SignToken
const Auth=require('./utils/jwtToken').Auth
const ComparePassword =require('./utils/password').ComparePassword
const HashPassword =require('./utils/password').HashPassword
const dotenv = require('dotenv');
const cors = require('cors');
const app=express();

if(process.env.NODE_ENV !=='Production'){
    
    require('dotenv').config({
        path:'./.env.sample'
    });
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

app.post('/api/login',ProxySetup,(req,res)=>{
    const {username,password,HashPassword}=req.body
    if(!username){
        res.status(400).json({
            message:'Username is Required'
        })
    }
    if(!password){
        res.status(400).json({
            message:'Password is Required'
        })
    }
    if(!HashPassword){
        res.status(400).json({
            message:'Hash Password is Required'
        })
    }
    ComparePassword(password,HashPassword).then(respone=>{
        let accessToken =jwtTokenSign(username)
        res.status(200).json({
            username,
            password,
            accessToken,
            message:"Login Success"
        })
    }).catch(error=>{
        res.status(400).json({
            message:'Wrong Password'
        })
    })
    
    
})
app.post('/api/register',ProxySetup,(req,res)=>{
    console.log('req.body: ', req.body);
    const {username,password}=req.body
    if(!username){
        res.status(400).json({
            message:'Username is Required'
        })
    }
    if(!password){
        res.status(400).json({
            message:'Password is Required'
        })
    }
    HashPassword(password).then(respone=>{
        let accessToken =jwtTokenSign(username)
        res.status(200).json({
            username,
            password:respone,
            accessToken,
            message:"Register Success"
        })
    }).catch(error=>{
        res.status(400).json({
            message:'Register Fail'
        })
    })
    
    
})

app.post('/api/auth',Auth,(req,res)=>{
    res.status(201).json({
        message:"Auth  User"
    })
})



app.listen(process.env.PORT||6400,()=>console.log(`App listen at ${6400}`))