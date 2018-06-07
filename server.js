const express = require('express')
const app = express()
var controller = require('./Controller/controller')
var model = require('./Models/model.js')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require("path");


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('views'));
app.set('views',__dirname+'/views');
// app.use(express.static('/views'))
// app.set('views', path.join(__dirname, 'views')); 




// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   // res.header('Access-Control-Allow-Credentials', true);
//   next();
// });

// app.use(cookieParser());

// app.use(session({
//   key: 'user_sid',
//   secret: 'somerandonstuffs',
//   resave: true,
//   saveUninitialized: false
// }));
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie('user_sid');
//   }
//   next();
// });


// middleware function to check for logged-in users
// var sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.user_sid) {
//     res.send(req.session.user)
//   } else {
//     res.statusCode = 401;
//     res.send({ "message": "not logged in" })
//   }
// };
// route for Home-Page
app.get('/',  (req, res) => {
  console.log("hello");
  
  res.render('login');
    //res.send("Welcome to my site")
});
app.get('/home',  (req, res) => {
  console.log("hello");
  
  res.render('home');
    //res.send("Welcome to my site")
});




// app.route('/login')
//   .get(function (req, res) {
//     res.render('./home.html')
//   })
//   .post(function (req, res) {
//     console.log("session", req.session);
//     if (req.session.user && req.cookies.user_sid) {
//       res.send(req.session.user);
//     } else {
//       var data = req.body;
//       console.log(data);

//       var responseData = {};
//       res.setHeader('Content-Type', 'application/json');
//       controller.cont.login(data.username, data.password).then(result => {
//         req.session.user = result;
//         res.send(result);
//       }
//       ).catch(result => {
//         res.statusCode = 401
//         res.send(result)
//       })
//     }
//   })
// app.route('/home')
//   .get(function (req, res) {
//     console.log("session profile", req.session);
//     if (req.session.user && req.cookies.user_sid) {
//       controller.cont.getCourse().then(result => {
//         res.send(result);
//       })
//         .catch(error => {
//           res.send(error);
//         })

//     } else {
//       res.statusCode = 401
//       result = { "message": "not logged in" };
//       res.send(result);
//     }
//   })

// app.get('/logout', (req, res) => {
//   if (req.session.user && req.cookies.user_sid) {
//     res.clearCookie('user_sid');
//     result = { "message": "logout" };
//     res.send(result);
//   } else {
//     res.statusCode = 401;
//     result = { "message": "login" };
//     res.send(result);
//   }
// });


app.route('/signup')
  .post(function (req, res) {
    var data = req.body;
    console.log(1,data);
    res.setHeader('Content-Type', 'application/json');
    controller.cont.signup(data.name, data.username, data.password, data.mobile).then(result =>
      res.send(result)
    ).catch(result => {
      res.statusCode = 401;
      res.send(result)
    })
  })

app.listen(3000, '0.0.0.0', function () {
  console.log('Tutorial app listening on port 3000!')
})
