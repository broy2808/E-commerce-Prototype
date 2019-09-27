import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import { blue500,red} from 'material-ui/styles/colors';
import LoginScreen from './Loginscreen';
import { Grid, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
//import Collapse from '@material-ui/core/Collapse';
//import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
var apiBaseUrl = "http://localhost:4000/api/";

// const useStyles = makeStyles(theme => ({
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }));

// const style1 = useStyles();

  
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { draweropen: false, currentScreen: [], datalist: [] };
    
    
    //this.props.userid;
  }
  componentDidMount() {
    // var currentScreen=[];
    // //currentScreen.push(<UploadScreen appContext={this.props.appContext} role={this.props.role}/>);
    // this.setState({currentScreen})


    fetch(apiBaseUrl + "login/items")
      .then(response => response.json())
      //.then(data => this.setState({ hits: data.hits }));
      .then(data => {
        console.log(data);

        this.setState({ datalist: data });
      });
  }
  /**
   * Toggle opening and closing of drawer
   * @param {*} event 
   */
  toggleDrawer(event) {
    // console.log("drawer click");
    this.setState({ draweropen: !this.state.draweropen })
  }


  

  handleMenuClick(event, page) {
    switch (page) {
      case "logout":
        var loginPage = [];
        loginPage.push(<LoginScreen appContext={this.props.appContext} />);
        this.props.appContext.setState({ loginPage: loginPage, uploadScreen: [] })
        break;
      default:
        loginPage = [];
        loginPage.push(<LoginScreen appContext={this.props.appContext} />);
        this.props.appContext.setState({ loginPage: loginPage, uploadScreen: [] })
        break;
    }
    this.setState({ draweropen: false })
  }




  //Product_id, Product_name, Product_desc, Product_type, User_id, create_time, Price
  render() {
    return (
      <div className="App" key={this.props.userid}>
        <MuiThemeProvider>
          <AppBar
            title="Shopping List"
            onLeftIconButtonClick={(event) => this.toggleDrawer(event)}
          />
          <div style={{ margin: 20, padding: 30 }}>
            <Grid container spacing={40} justify="center">
              {this.state.datalist.map(data => (
                <Grid item key={data.Product_id | data.Product_name | data.User_id}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        image="https://bit.ly/2WNi2Ml"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {data.Product_id}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {data.Product_name}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          Seller:  {data.first_name},{data.last_name}
                        </Typography>
                        
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                    <IconButton aria-label="share">
                      <ShareIcon />
                   </IconButton>
                   
                      <Button size="small" color="primary" > 
                        Learn More
                      </Button>
                      </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider>
          <Drawer open={this.state.draweropen}>
            <MenuItem>
              <div>
                User Profile
              <a href="./public/user.png"><FontIcon
                  className="material-icons drawerclosebutton"
                  color={blue500}
                  styles={{ top: 10, }}
                  onClick={(event) => this.toggleDrawer(event)}
                >clear</FontIcon></a>
              </div>
            </MenuItem>
            <div>
              <MenuItem onClick={(event) => this.handleMenuClick(event, "logout")}>
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



export default App;
