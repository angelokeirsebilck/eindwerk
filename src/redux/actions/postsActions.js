import { API } from '../../config/API';

export const loadPosts = () => {
    return function (dispatch) {
        API.get("api/posts").then(response => {
            console.log(response);
            dispatch({
                type: "LOAD_POSTS",
                payload: response.data.data
            });
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
    }
}

export const addPostAction = (postValues) => {
    console.log(postValues);
    API.post("api/posts", postValues).then(response => {

    }).catch(function (error) {
        // handle error
        console.log(error);
    });
}