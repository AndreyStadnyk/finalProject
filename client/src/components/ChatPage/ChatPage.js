import React from "react";
import makeStyles from "../Post/Post";
import Header from "../Header/Header";

export default function ChatPage (){

    const useStyles = makeStyles(theme => ({
        leftPannelOfUsers:{
           width:"30%" ,
            backgroundColor:"blue"
        },
        container:{
            display:"flex",
        },
        rightPannelChat:{

        }

    }))
    const classes = useStyles()

return(
    <div className={classes.container}>
        <Header/>
        <div>
            <div className={classes.leftPannelOfUsers}>

            </div>
            <div className={classes.rightPannelChat}>

            </div>
        </div>

    </div>
)
}