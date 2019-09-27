import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
//import RaisedButton from 'material-ui/RaisedButton';
//import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import image1 from './Images/Booth.jpg';
import DropDownMenu from 'material-ui/DropDownMenu';

import {
  
  FormControl,
  InputLabel,
  Input
} from "@material-ui/core";
import {blue500} from 'material-ui/styles/colors';
import LoginScreen from './Loginscreen';
import axios from 'axios';
var apiBaseUrl = "http://localhost:4000/api/";
//import { white } from 'material-ui/styles/colors';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {draweropen: false,currentScreen:[],
      productid:'',
      productname:'',
      productdesc:'',
      producttype:'Book',
      seller:this.props.userid,
      price: 0.00
    };
    this.form1 = React.createRef();
    //this.props.userid;
  }

  

  /**
   * Toggle opening and closing of drawer
   * @param {*} event 
   */ 
  toggleDrawer(event){
  // console.log("drawer click");
  this.setState({draweropen: !this.state.draweropen})
  }
  

  handleClick(event){

    this.form1.current.reportValidity();
    if (this.form1.current.reportValidity()){
    if(this.state.price<0.00){
      alert("Please use correct price for your product.");
      return;
    }
    if(this.state.productid<0){
      alert("Please use correct product id for your product.");
      return;
    }
    console.log(this.state.productid,this.state.seller);
    //var self = this;
    var payload={
      "productid":this.state.productid,
      "userid":this.state.seller,
	    "productname":this.state.productname,
      "productdesc":this.state.productdesc,
      "producttype":this.state.producttype,
      "price":this.state.price
      
    }
    console.log(payload.productid," ",payload.userid," ",payload.productname," ",payload.productdesc," ",payload.producttype," ",payload.price);
 
      axios.post(apiBaseUrl + 'login/productload', payload)
        .then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            console.log("product Update successfull");
            alert("Product Update successfull");
            // var uploadScreen = [];
            // if (self.state.loginRole === "User") {
            //   uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole} userid={self.state.username} key={self.state.loginRole} />)
            //   self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
            // } else {
            //   uploadScreen.push(<UploadPage2 appContext={self.props.appContext} role={self.state.loginRole} userid={self.state.username} key={self.state.loginRole} />)
            //   self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
            // }

          }
          else if (response.data.code === 204) {
            console.log("Product ID ALREADY exists.");
            alert("Product ID ALREADY exists.");
           
          }
          else {
            alert("Product ID ALREADY exists.");
      
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    
    this.handleSubmitted();
   
  }
  // handleSubmitted(){
  //   console.log("Submitted");
  //   this.setState({productid:'',
  //   productname:'',
  //   productdesc:'',
  //   producttype:'Book',
  //   seller:this.props.userid,
  //   price: 0.00})
  //    // resets "username" field to "admin"
  // }
  handleSubmitted (){
    document.getElementById("p1").value="";
    document.getElementById("p2").value="";
    document.getElementById("p3").value="";
    document.getElementById("p4").value="Book";
    document.getElementById("p5").value="";
    // resets "username" field to "admin"
  }
  handleMenuClick(event,page){
    switch(page){
      case "logout":
      var loginPage =[];
      loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
      this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
      break;
      default:
      loginPage =[];
      loginPage.push(<LoginScreen appContext={this.props.appContext}/>);
      this.props.appContext.setState({loginPage:loginPage,uploadScreen:[]})
      break;  
    }
    this.setState({draweropen:false})
  }

  handleChange(event,id) {
  
   switch(id){
      case 1:
      console.log(id)
      this.setState({productid: event.target.value});
      break;
      case 2:
      console.log(id)
      this.setState({productname: event.target.value});
      break;
      case 3:
      this.setState({productdesc: event.target.value});
      break;
      case 4:
        this.setState({producttype: event.target.value});
      break;
      case 5:
        this.setState({price: event.target.value});
      break;
      default:
      break;
   }
  }


  handleMenuChange(value){
    console.log("menuvalue",value);
    this.setState({producttype:value});
  }
  render() {
    return (
      <div  class="MuiTextField-root-5 MuiTextField-maxWidthXs-7" style={{
         backgroundImage: "url("+image1+")"
         }} key={this.props.userid}>
        <MuiThemeProvider>
          <AppBar
            title="Upload Page"
            onLeftIconButtonClick={(event) => this.toggleDrawer(event)}
          />
         
          <div
        style={{
          display: 'flex',
          justifyContent: "center",
          marginLeft: 200,
          marginRight: 240,
          padding: 30,
          border: '5px solid',
          backgroundColor: 'rgba(52, 52, 52, 0.0)',
          
           }}>
        <form ref={this.form1} style={{ width: "50%" }} onSubmitted={this.handleSubmitted}> 
        
          <h1>Product Form</h1>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name" style={{fontSize: '25px'}} >Product ID</InputLabel>
            <Input id="p1" type="number" className="form-control" required placeholder="Enter product id" style={{fontSize: '25px'}}  onChange ={(event) => this.handleChange(event,1)}/>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name" style={{fontSize: '25px'}} >Product Name</InputLabel>
            <Input id="p2" type="text"  required minlength="6" className="form-control" placeholder="Enter product name" style={{fontSize: '25px'}} onChange ={(event) => this.handleChange(event,2)}/>
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email" style={{fontSize: '25px'}} >Product description</InputLabel>
            <Input id="p3" type="textarea"  minlength="10" className="form-control" required style={{ fontSize: '25px'}} placeholder="Enter product description" onChange ={(event) => this.handleChange(event,3)}/>
          </FormControl>
         
          <FormControl margin="normal" fullWidth >
         
          <div >
          <p style={{
           position: 'sticky',
           marginRight: '430px',
           fontSize: '25px'
          }}>Product Type</p>
          </div>
          <div>
          <DropDownMenu style={{
           position: 'sticky',
           marginRight: '490px',
           fontSize: '25px',
           backgroundColor: 'Beige'
          }} id="p4" className="form-control" required value={this.state.producttype} onChange ={(event,index,value)=>this.handleMenuChange(value)}>
             <MenuItem value={"Book"} primaryText="Book" style={{fontSize: '25px'}}  />
             <MenuItem value={"Electronics"} primaryText="Electronics" style={{fontSize: '25px'}}  />
             <MenuItem value={"Food"} primaryText="Food" style={{fontSize: '25px'}} />
             <MenuItem value={"Clothes"} primaryText="Clothes" style={{fontSize: '25px'}} />
          </DropDownMenu>
         </div>
       
        
        </FormControl>
          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name" style={{fontSize: '25px'}} >Product Price</InputLabel>
            <Input id="p5" className="form-control"  required type="number" step="0.01"  placeholder="0.00" style={{fontSize: '25px'}}  onChange ={(event) => this.handleChange(event,5)}/>
          </FormControl>
          </form>
          <br/>
          </div>
          <button label="Submit" primary={true} style={{margin: 25,width: '100px',height: '30px',color:blue500 }}  onClick={(event) => this.handleClick(event)}>Submit</button>
       
      
       
          <Drawer open={this.state.draweropen}>
            <MenuItem >
              <div>
              User Profile
              <a href="./public/user.png"><FontIcon
                className="material-icons drawerclosebutton"
                color={blue500}
                styles={{ top:10,}}
                onClick={(event) => this.toggleDrawer(event)}
              >clear</FontIcon></a>
              </div>
            </MenuItem>
              <div>
              <MenuItem onClick={(event) => this.handleMenuClick(event,"logout")}>
                  Logout
              </MenuItem>
              </div> 
          </Drawer>
        </MuiThemeProvider>
        <div>
          {this.state.currentScreen}
        </div>
      </div>
    );
  }
}


// const style1 = {
//   margin: 25,
//   border: '5px solid #00FFFF',
// };


// const Textstyle1 = {
//   margin: 10,
//   border: '5px black',
  
// };
export default App;
