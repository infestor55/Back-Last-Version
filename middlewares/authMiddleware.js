import  Jwt  from "jsonwebtoken";

//Protected Routes token base
export const requireSignIn = async(req,res,next) =>{
    const token = req.headers.authorization.split(" ")[1]
    try{
        const decode = Jwt.verify(
            token,
            process.env.JWT_SECRET
            );
        next();
    }catch(error){
        console.log(error)
    }
};