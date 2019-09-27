var mysql = require('mysql');
// var bcrypt = require('bcrypt');
//var jsonfile = require('jsonfile');
var connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : 'Root0@mysql',
  database : 'people',
 
});
console.log("Database hello");
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn",err);
}
});

exports.register = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  
   var users={
     "first_name":req.body.first_name,
     "last_name":req.body.last_name,
     "userid":req.body.userid,
     "password":req.body.password,
     "role":req.body.role,
     "create_time":today,
     
   }

   console.log("first name = "+users.first_name+", last name = "+users.last_name+", role = "+users.role+", password is "+users.password);
   
   connection.query('INSERT INTO user SET ?',users, function (error, results, fields) {
   if (error) {
     console.log("error ocurred",error);
     res.send({
       "code":400,
       "failed":"error ocurred"
     })
   }else{
    //  console.log('The solution is: ', results);
     res.send({
       "code":200,
       "success":"user registered sucessfully"
         });
   }
   })
   
   ;
  // });


}



exports.login = function(req,res){
  var userid= req.body.userid;
  var password = req.body.password;
  var role = req.body.role;
  connection.query('SELECT * FROM people.user WHERE userid = ? and role= ?',[userid,role], function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    // console.log('The solution is: ', results[0].password,req.body.password,req.body.role);
    if(results.length >0){
      console.log(results[0].password,"  ",req.body.password);
      if(results[0].password == req.body.password){
        if(results[0].role == req.body.role){
          var file = './userdata/userid.json'
          var obj = {userid: req.body.userid}
        
          res.send({
            "code":200,
            "success":"login sucessfull"
          })
        }
        else{
          res.send({
            "code":204,
            "success":"You have logged in from wrong user role"
          })
        }

      }
      else{
        res.send({
             "code":204,
             "success":"Email and password does not match"
        })
      }

    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }


  }
  });
}


exports.productload = function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  
   var product={
     
     "Product_id":req.body.productid,
     "Product_name":req.body.productname,
     "Product_desc":req.body.productdesc,
     "Product_type":req.body.producttype,
     "User_id":req.body.userid,
     "create_time":today,
     "Price":req.body.price
   }

   console.log( "Product ID "+product.Product_id);
   
   connection.query('INSERT INTO PRODUCT SET ?',product, function (error, results, fields) {
   if (error) {
     console.log("error ocurred",error);
     res.send({
       "code":204,
       "failed":"Product ID present already."
     })
   }else{
    //  console.log('The solution is: ', results);
     res.send({
       "code":200,
       "success":"Product updated sucessfully."
      });
   }
   })
   
   ;
  // });


}


exports.items = function(req,res){
  // console.log("req",req.body);
 
  
  connection.query("SELECT A.*,B.first_name,B.last_name FROM people.PRODUCT A , people.user B where A.user_id=B.userid and B.role='Seller'", function (error, results, fields) {
    // If some error occurs, we throw an error.
    if (error) throw error;

    // Getting the 'response' from the database and sending it to our route. This is were the data is.
    res.send(results)
  });
   
   
  // });

}




