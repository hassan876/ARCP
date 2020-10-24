import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Tabf(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        props.onchange(newValue)
    };

    return (
        <div className={classes.root}>

            <Tabs value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="simple tabs example"
                TabIndicatorProps={{
                    style:
                    {
                        background: 'blue',
                        // height: '100%',
                        color: '#f7f7f7'
                    }
                }}>

                <Tab label="All" {...a11yProps(0)} />
                <Tab label="Published" {...a11yProps(1)} />
                <Tab label="Draft" {...a11yProps(2)} />
                <Tab label="Archived" {...a11yProps(3)} />
            </Tabs>

            {/* <TabPanel value={value} index={0}>
                Item One
      </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
      </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
      </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
      </TabPanel> */}
        </div>
    );
}