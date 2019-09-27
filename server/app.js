var express    = require("express");
var login = require('./routes/index');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

// test route
router.get('/', function(req, res) {
    console.log('test route');
});

//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login);

router.post('/login/productload',login.productload);

router.get('/login/items',login.items);
//route to handle file printing and listing

app.use('/api', router);
//app.listen(3000);
app.listen(4000, () => {
    console.log('Go to http://localhost:4000/posts to see posts');
   });