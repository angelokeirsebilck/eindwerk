const initialState = [];

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_POSTS':
            console.log("load_posts_reducer");
            return action.payload
    }

    return state;
}

export default postsReducer;