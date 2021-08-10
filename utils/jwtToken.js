var jwt = require('jsonwebtoken');

function SignToken(params) {
   var token= jwt.sign({ username:params},process.env.secret,{ expiresIn: '2d' })
    return  token
}
function VerifyToken(req,res,next){
  
      try {
        const token = req.headers["x-access-token"];
        const decodedToken = jwt.verify(token, process.env.secret);
        const username = decodedToken.username;
        if (req.body.username && req.body.username !== username) {
          
            res.status(405).json({
              message:'UnAuthorize User'
            })
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          message:'UnAuthorize User'
        })

    }
}
module.exports={
    SignToken,
    Auth:VerifyToken
}