import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { Toolbar } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    background: "linear-gradient(90deg, rgba(6,28,55,1) 7%, rgba(9,121,84,1) 35%, rgba(12,133,158,1) 60%, rgba(67,102,108,1) 83%, rgba(6,61,71,1) 95%)",
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(6,28,55,.3)',
    color: 'white',
    height: 55,
    padding: '0 30px',
  }
});

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = ( newValue) => {
    setValue(newValue);
  };

  return (
    <div >
      <AppBar position="static" className={classes.root}>
        <Toolbar>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example">
          <LinkTab label="Home" href="/authenticate" {...a11yProps(0)} />
          <LinkTab label="About Us" href="/trash" {...a11yProps(1)} />
          <Button color="inherit" >Log Out</Button>
        </Tabs>
          </Toolbar>
      </AppBar>
    </div>
  );
}



