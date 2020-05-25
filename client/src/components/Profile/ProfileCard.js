import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'
import {changeProfilePhoto, getUserPhoto, profileTypes} from '../../actions/profileActions'
import Cookies from 'universal-cookie';

const useStyles = makeStyles({
    root: {},
    media: {
        height: 300
    }
})
export default function ProfileCard(props) {
    const [photo, setPhoto] = useState(null)
    const classes = useStyles()
    const dispatch = useDispatch()
    const anotherUsername = props.anotherUser ? props.anotherUser : {}
    const isPhotoChanged = useSelector(state => state.users.photoChanged)
    const username = useSelector(state => state.users.currentUser.username)

    const cookies = new Cookies();
const token = cookies.get('JSESSIONID')
    console.log(token);
    const photoSelectHandler = (e) => {
        const file = e.target.files[0]
        console.log(e.target.files[0])
        const formDataForPhoto = new FormData()
        formDataForPhoto.append("file", file)
        dispatch(changeProfilePhoto(formDataForPhoto))
        if (isPhotoChanged) {
            const data = {
                'username': username
            }
            dispatch(getUserPhoto(data,))
        }

    }

    const {
        currentUser,
        anotherUser,
        updateUserPage
    } = useSelector(state => ({
        currentUser: state.users.currentUser,
        anotherUser: state.users.anotherUser,
        updateUserPage: state.users.updateUserPage
    }))

    const isCurrentUser = Object.keys(anotherUsername).length === 0

    let buttonLabel
    if (updateUserPage) {
        buttonLabel = 'Cancel edit profile'
    } else {
        buttonLabel = 'Edit profile'
    }

    const editButton = isCurrentUser
        ? <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => dispatch({type: profileTypes.UPDATE_USER_PAGE, payload: !updateUserPage})}
        >
            {buttonLabel}
        </Button> : null

    return (
        <Card variant='outlined' className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={photo}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {isCurrentUser ? currentUser.username : anotherUser.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        First name: {isCurrentUser ? currentUser.firstName : anotherUsername.firstName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Last name: {isCurrentUser ? currentUser.lastName : anotherUser.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Email: {isCurrentUser ? currentUser.email : anotherUser.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Address: {isCurrentUser ? currentUser.address : anotherUser.address}
                    </Typography>
                    {editButton}
                    <input onChange={photoSelectHandler} type="file"/>
                </CardContent>
            </CardActionArea>

            <CardActions>
            </CardActions>

        </Card>
    )
}