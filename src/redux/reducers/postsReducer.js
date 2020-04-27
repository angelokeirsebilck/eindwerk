const initialState = {
    posts: [],
    pageCount: '',
    commentEditor: undefined
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
    }

    return state;
}

export default postsReducer;