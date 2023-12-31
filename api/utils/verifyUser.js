import jwt from 'jsonwebtoken';
import {errorHandler} from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // "access_token" is the token name we defined in "auth.controller.js".

  // If no token in the request, return the error using the function we defined in "error.js".
  if (!token) return next(errorHandler(401, 'Unauthorized or cookie has expired'));

  // Verify if the token in the request is an existing token. 
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    // If it's not an existing token, return the error.
    if (err) return next(errorHandler(403, 'Forbidden'));

    // Otherwise, we know the requesting user is the "user" holding the token. Then, we can assign all attributes of "user" to the requesting user for following User record update.
    req.user = user;

    next(); // We proceed to the next function such as "updateUser" or "deleteUser" defined in "user.route.js".
  });
};

// The middleware that checks if the cookie has expired.
export const tokenExist = (req, res) => {
  const token = req.cookies.access_token;
  if (!token){
    res.status(200).json('Token has expired!');
  }
  res.status(200).json('We are good!');
};