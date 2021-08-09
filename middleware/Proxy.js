const { createProxyMiddleware } = require('http-proxy-middleware');

function ProxySetup(req,res,next){
try {
    // Create Proxy 
    createProxyMiddleware({
        target: 'http://localhost:7200',
        secure:true,
        changeOrigin: true ,
        "headers": {
           "Connection": "keep-alive"
         },
    })  
    next()
} catch (error) {
    res.status(405).json({
        message:'GET Request error'
      })
}

}

module.exports={
    ProxySetup
}