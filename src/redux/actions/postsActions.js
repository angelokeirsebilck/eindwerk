import { API } from '../../config/API';

export const loadPosts = () => {
    return function (dispatch) {
        API.get("api/posts").then(response => {
            console.log(response.data.data);
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