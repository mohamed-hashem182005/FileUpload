
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token =authHeader && authHeader.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({
            sucess: false,
            message:'Acess denied . No token provided. Please login to continue'
        })
    }
    //decode this token
    try {
        const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedTokenInfo);

        req.userInfo = decodedTokenInfo;
        next();
        
    } catch (e) {
        return res.status(500).json({
            sucess: false,
            message: 'Acess denied . No token provided. Please login to continue'
        })
    }
    
    
} 
module.exports = authMiddleware;