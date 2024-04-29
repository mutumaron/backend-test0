const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcrypt");
const {NotAuthError} = require('./errors');

const KEY = "mutethiaronny";

const createJSONToken = (email) => {
  return sign({ email }, KEY, { expiresIn: "1h" });
};
const validateJSONToken = (token) => {
  return verify(token, KEY);
};
function isValidPassword(password,storedPassword){
    return compare(password,storedPassword);
}
function checkAuthMiddleware(req,res,next){
    if(req.method === 'OPTIONS'){
        return next();
    }
    if(!req.headers.authorization){
        console.log('NO AUTH.AUTH HEADER MISSING');
        return next(new NotAuthError('Not Authenticated'));
    }
    const authFragments = req.headers.authorization.split(' ');

    if(authFragments.length !== 2){
        console.log('NOT AUTH.AUTH HEADER INVALID');
        return next(new NotAuthError('Not Authenticated'));
    }
    const authToken = authFragments[1];
    try{
        const validatedToken = validateJSONToken(authToken);
        req.token = validatedToken;
    } catch(error) {
        console.log('NOT AUTH. TOKEN INVALID');
        return next(new NotAuthError('Not Authenticated'));
    }
    next();
}

exports.createJSONToken = createJSONToken;
exports.validateJSONToken = validateJSONToken;
exports.isValidPassword = isValidPassword;
exports.checkAuth = checkAuthMiddleware;