import {actionTypes} from '../actions'

const initialState = {
    pending: true,
    userPosts: null,
    wallPosts: null,
    postComments: null
}

export default function postsReducer(state = initialState, action) {
    let currentPost
    let currentComment


    switch (action.type) {
        case actionTypes.FETCH_USER_POSTS_PENDING:
            return {
                ...state,
                pending: true
            }

        case actionTypes.FETCH_USER_POSTS_SUCCESS:
            return {
                ...state,
                pending: false,
                userPosts: action.payload
            }

        case actionTypes.FETCH_WALL_POSTS_PENDING:
            return {
                ...state,
                pending: true
            }

        case actionTypes.FETCH_WALL_POSTS_SUCCESS:
            return {
                ...state,
                pending: false,
                wallPosts: action.payload
            }

        case actionTypes.UPDATE_POST:
            currentPost = {...action.payload}
            return {
                userPosts: state.userPosts.map(post => post.id === currentPost.id ? currentPost : post)
            }

        case actionTypes.SWITCH_LIKE:
            currentPost = {...action.payload}
            currentPost.likes++
            return {
                userPosts: state.userPosts.map(post => post.id === currentPost.id ? currentPost : post)
            }

        case actionTypes.CREATE_COMMENT:
            currentComment = {...action.payload}
            //  for(let i = 0; i < userPosts.length; i++) {
            //     return userPosts[i]
            //  }
            // // currentPost = state.userPosts.forEach(post => {return post})
            console.log(currentComment);
            // console.log(currentPost);
            // console.log(userPosts[i]);

            return {
                // postComments: state.postComments.map(post => post.id === currentPost.id ? currentPost : post)
                // postComments: state.postComments.push(currentComment)
                // userPosts.co : state.userPosts.comments.map(comment => comment.id === currentPost.id ? currentPost : comment)
                //...userPosts.comme
               ...state,
                userPosts: state.userPosts.map(post => {
            if(post.id === currentComment.postId) {
                post.comments.push(currentComment)
                return post
            }
            return post
                })
                // userPosts.currentPost.comments : state.userPosts.map(post => post.id === currentPost.id ? currentPost : post)

            }
        default:
            return state
    }
}
