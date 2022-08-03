import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    // console.log(req.headers)
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    //NB our custom token from backend is lessthan 500 while that coming from google is above 500

    let decodedData;
 
    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      // console.log("this is the id "+decodedData?.id) this is only possible to show on the console because we installed morgan
      
      //this req.userId can be anything, it can be req.acb or req.user
      req.userId = decodedData?.id;
    } else {
        //this is for google login in case we are signing in via google
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({message:error})
  }
};

export default auth;