import React, {Component} from 'react';
import Post from "../Post/Post";
import "./Tape.css"
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Header from "../Header/Header";

const username = {username: 'emad_hamad171'};
const useStyles = makeStyles({
    list: {
        width: 250,
        marginTop:"50px"
    },
    fullList: {
        width: 'auto',
    },
    font:{
        fontFamily: "Roboto Helvetica Arial sans-serif"
    }
});
function Tape() {
    const classes = useStyles();

    return(
        <div>
            <Header/>
            <div className='wrapper'>

                <div
                    className={classes.list}
                    role="presentation"

                >
                    <List>
                        {['Лента Новостей', 'Messenger', 'Watch', 'Drafts'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                    <span className={classes.font}>Inteseting</span>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>

                <Post  />
            </div>
        </div>


    )
}
export default Tape