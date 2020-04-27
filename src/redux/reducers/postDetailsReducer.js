const initialState = {
    post: [],
    isLoading: true,
    addComment: false,
    comment: []
};

const postDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_POST':
            return {
                ...state,
                post: action.payload
            }
        case 'EMPTY_POST':
            return {
                ...state,
                post: []
            }
        case 'SET_LOADING_FALSE':
            return {
                ...state,
                isLoading: false
            }
        case 'SET_ADD_COMMENT_FALSE':
            return {
                ...state,
                addComment: false
            }
        case 'SET_ADD_COMMENT_TRUE':
            return {
                ...state,
                addComment: true
            }
    }

    return state;
}

export default postDetailsReducer;