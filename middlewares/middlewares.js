const jwt = require('jsonwebtoken');
//ENV
require('dotenv').config({
  path: __dirname + '/.env'
});
const DBConfig = require('../db_config');


let publicUri = [
  '',
  '/user/login',
];



function common(req, res, next) {
  // res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.append('Content-Type', 'application/json');


  res.sendError = function (msg, data = []) {
    res.status(200).json({
      code: 200,
      status: 'error',
      message: msg,
      data: data
    });
    // DBConfig.end();
  }


  res.sendWarning = function (msg, type = '') {
    res.status(200).json({
      code: 200,
      status: 'warning',
      message: msg,
      type: type
    });
    // DBConfig.end();
  }


  res.sendInfo = function (msg, data) {
    res.status(200).json({
      code: 200,
      status: 'info',
      data: data,
      message: msg
    });
    // DBConfig.end();
  }

  res.sendSuccess = function (msg, data = []) {
    // passport.authenticate('local');
    res.status(200).json({
      code: 200,
      status: 'success',
      message: msg,
      data: data
    });
    // DBConfig.end();
  }
  next();
}


const authenticateJWT = (req, res, next) => {
  //check for anonymous URLs
  let publicUrl = (publicUri.indexOf(req.originalUrl) > -1 ? true : false);
  

  if (!publicUrl) {


    var authHeader = req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined;

    // console.log(authHeader, "authHeader")

    if (authHeader) {
      const token = authHeader;

      jwt.verify(token, process.env.SIGN_TOKEN, (err, user) => {
        if (err) {
          const refreshToken = req.cookies.refreshToken;
          jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err1, user1) => {
            if (err1) {
              return res.sendWarning("User Session Has Expired!", 'unauthorized');
            } else {

              req.user = user1;
              process.env['DB_NAME'] = "erp" + user1.cpin;


              DBConfig.changeUser({
                database: process.env.DB_NAME,
              }, (err) => {
                if (err) throw err;
                console.log(process.env.DB_NAME + " DB Connected")
              });

              next();
              // })
            }
          })

        } else {
          req.user = user;
          process.env['DB_NAME'] = "erp" + user.cpin;

          DBConfig.changeUser({
            database: process.env.DB_NAME,
          }, (err) => {
            if (err) throw err;
            console.log(process.env.DB_NAME + " DB Connected")
          });
          next();
          // })
        }
      });
    } else {
      return res.sendWarning("User Session Has Expired!", 'unauthorized');
    }
  } else {
    next();
  }
};

module.exports = {
  authenticateJWT,
  common
};