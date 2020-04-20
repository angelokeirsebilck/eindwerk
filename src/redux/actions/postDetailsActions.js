import { API } from '../../config/API';

export const loadPost = (postId)  =>  {
    return function (dispatch) {
        API.get("api/posts/" + postId).then(response => {
            dispatch({
                type: "LOAD_POST",
                payload: response.data
            });

        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }
}

export const setLoadingFalse = ()  =>  {
    return {type: "SET_LOADING_FALSE"}
}

export const setNewCommentFalse = ()  =>  {
    return {type: "SET_ADD_COMMENT_FALSE"}
}

export const setNewCommentTrue = ()  =>  {
    return {type: "SET_ADD_COMMENT_TRUE"}
}