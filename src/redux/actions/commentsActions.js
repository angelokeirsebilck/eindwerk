import { API } from '../../config/API';

export const saveComment = (commentId, comment) => dispatch =>  {

    API.put("api/comments/" + commentId, comment).then(response => {

    }).catch(function (error) {
        // handle error
        console.log(error);
    });
}