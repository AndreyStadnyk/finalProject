import React, {useState} from 'react'
import {Icon, Button, MuiThemeProvider} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ChatBubbleOutlinedIcon from '@material-ui/icons/ChatBubble';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ReplyIcon from '@material-ui/icons/Reply';
import Avatar from "@material-ui/core/Avatar";
import {StylesProvider} from "@material-ui/styles"
import makeStyles from "@material-ui/core/styles/makeStyles";

import "./Post.css"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const user = {
    userName: "Имад"
};
const useStyles = makeStyles(theme => ({


}));
const theme = createMuiTheme({
    overrides: {
        MuiButton:{
            text:{
padding:"4px 30px",
                textTransform:"none"
            }
        }
    }
});
export default function Content() {
    const classes = useStyles();
    const [count, setCount] = useState(0);

    return (
        <MuiThemeProvider theme={theme}>
            <StylesProvider>
                <div className='card'>
                    <div className='subheader'>
                        <div className='info'>
                            <Avatar src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar/>
                            <span className="user-name">{user.userName}</span>
                        </div>
                        <Icon name='setting'/>
                    </div>

                    <div className='photo-holder'>

                    </div>

                    <div className='card-footer'>
                        <div className="pre-footer">
                            <ThumbUpAltOutlinedIcon/> {count}
                        </div>
                        <div className='icon-container'>
                            <Button

                                color="none"
                                className={classes.button}
                                startIcon={<ThumbUpAltIcon />}
                                onClick={() => setCount(count + 1)}
                            >
                                Like
                            </Button>
                            {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
                            <Button
                                color="none"
                                className={classes.button}
                                startIcon={<ChatBubbleOutlinedIcon/>}
                            >
                                Send
                            </Button>
                            <Button
                                color="none"
                                className={classes.button}
                                startIcon={<ReplyIcon/>}
                            >
                                Share
                            </Button>

                        </div>

                    </div>
                </div>
            </StylesProvider>
        </MuiThemeProvider>
    )
}
;

