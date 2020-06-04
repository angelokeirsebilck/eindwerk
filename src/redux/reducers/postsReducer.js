const initialState = {
    posts: [],
    pageCount: 0,
    commentEditor: undefined,
    editCommentEditor: undefined,
    post: [],
    postIsLoading: true,
    postsIsLoading: true
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_POSTS':
            return {
                ...state,
                posts: action.payload.data

            }

        case 'LOAD_PAGE_COUNT':
            return {
                ...state,
                pageCount: action.payload.last_page
            }
        case 'SET_COMMENT_EDITOR':
            return {
                ...state,
                commentEditor: action.payload
            }
        case 'LOAD_POST_DETAILS':
            return {
                ...state,
                post: action.payload
            }
        case 'UNSET_POST_DETAILS':
            return {
                ...state,
                post: []
            }
        case 'SET_POST_IS_LOADING_FALSE':
            return {
                ...state,
                postIsLoading: action.payload
            }
        case 'SET_POST_IS_LOADING_TRUE':
            return {
                ...state,
                postIsLoading: action.payload
            }
        case 'SET_POSTS_IS_LOADING_FALSE':
            return {
                ...state,
                postsIsLoading: action.payload
            }
        case 'SET_POSTS_IS_LOADING_TRUE':
            return {
                ...state,
                postsIsLoading: action.payload
            }
    }

    return state;
}

export default postsReducer;