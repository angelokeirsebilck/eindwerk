const initialState = {
    user: undefined
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            console.log("set_userdata_reducer");
            return { user: action.payload };
        case 'DELETE_USER_DATA':
            console.log("delete_userdate_reducer");
            return { initialState };
    }

    return state;
}

export default authReducer;