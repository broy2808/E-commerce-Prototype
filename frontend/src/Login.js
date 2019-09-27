import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import UploadPage from './UploadPage';
import UploadPage2 from './UploadPage2';

var apiBaseUrl = "http://localhost:4000/api/";
class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <main class="MuiContainer-root-5 MuiContainer-maxWidthXs-7">        
        <div class="jss3" style={style1}>
        <TextField style={Textstyle1} 
           hintText="Enter your User ID"
           floatingLabelText="User Id"
           onChange={(event,newValue) => this.setState({username:newValue})}
           />
         
         <br/>
           <TextField style={Textstyle1} 
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style1} onClick={(event) => this.handleClick(event)}/>
       </div>
       </main>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      menuValue:1,
      loginComponent:localloginComponent,
      loginRole:'User'
    }
  }
  componentWillMount(){
  // console.log("willmount prop values",this.props);
  if(this.props.role !== undefined){
    if(this.props.role === 'User'){
      console.log("in user componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <main class="MuiContainer-root-5 MuiContainer-maxWidthXs-7">        
          <div class="jss3" style={style1}> 
           <TextField style={Textstyle1} 
             hintText="Enter your User Id"
             floatingLabelText="User Id"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField style={Textstyle1} 
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style1} onClick={(event) => this.handleClick(event)}/>
         </div>
         </main>
         </MuiThemeProvider>
      )
      this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'User'})
    }
    else if(this.props.role === 'Seller'){
      console.log("in Seller componentWillMount");
      localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <main class="MuiContainer-root-5 MuiContainer-maxWidthXs-7">        
        <div class="jss3" style={style1}>
           <TextField  style={Textstyle1} 
             hintText="Enter your Seller Id"
             floatingLabelText="Seller Id"
             onChange={(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField  style={Textstyle1} 
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange={(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style1} onClick={(event) => this.handleClick(event)}/>
         </div>
         </main>
         </MuiThemeProvider>
      )
      this.setState({menuValue:2,loginComponent:localloginComponent,loginRole:'Seller'})
    }
  }
  }
  handleClick(event){
    var self = this;
    var payload={
      "userid":this.state.username,
	    "password":this.state.password,
      "role":this.state.loginRole
    }
    axios.post(apiBaseUrl+'login', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code === 200){
       console.log("Login successfull");
       var uploadScreen=[];
       if (self.state.loginRole==="User"){
        uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole} userid={self.state.username} key={self.state.loginRole}/>)
       self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
       }else{
        uploadScreen.push(<UploadPage2 appContext={self.props.appContext} role={self.state.loginRole} userid={self.state.username} key={self.state.loginRole}/>)
        self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
       }
      
     }
     else if(response.data.code === 204){
       console.log("Username password do not match");
       alert(response.data.success)
     }
     else{
       console.log("Username does not exists");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }
  handleMenuChange(value){
    console.log("menuvalue",value);
    var loginRole;
    if(value===1){
      var localloginComponent=[];
      loginRole='User';
      localloginComponent.push(
        <MuiThemeProvider>
          <main class="MuiContainer-root-5 MuiContainer-maxWidthXs-7">        
        <div class="jss3" style={style1}> 
           <TextField   style={Textstyle1} 
             hintText="Enter your User Id"
             floatingLabelText="User Id"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField  style={Textstyle1} 
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style1} onClick={(event) => this.handleClick(event)}/>
         </div>
         </main>
         </MuiThemeProvider>
      )
    }
    else if(value === 2){
      localloginComponent=[];
      loginRole='Seller';
      localloginComponent.push(
        <MuiThemeProvider>
          <main class="MuiContainer-root-5 MuiContainer-maxWidthXs-7">        
        <div class="jss3" style={style1}>
           <TextField style={Textstyle1} 
             hintText="Enter your Seller Id"
             floatingLabelText="Seller Id"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField style={Textstyle1} 
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style1} onClick={(event) => this.handleClick(event)}/>
         </div>
         </main>
         </MuiThemeProvider>
      )
    }
    this.setState({menuValue:value,
                   loginComponent:localloginComponent,
                   loginRole:loginRole})
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="Login"
           />
        </MuiThemeProvider>
        <MuiThemeProvider>
        <div >
        <p>Login as:</p>
        <DropDownMenu value={this.state.menuValue} onChange={(event,index,value)=>this.handleMenuChange(value)}>
          <MenuItem value={1} primaryText="User" />
          <MenuItem value={2} primaryText="Seller" />
        </DropDownMenu>
        </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style1 = {
  margin: 25,
  border: '5px solid #00FFFF',
};

const Textstyle1 = {
  margin: 15,
  border: '5px black',
  
};

export default Login;
