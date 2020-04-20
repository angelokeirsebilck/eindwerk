const initialState = {
    posts: [],
    pageCount: ''
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
    }

    return state;
}

export default postsReducer;