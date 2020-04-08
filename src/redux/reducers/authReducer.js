const initialState = {
    user: undefined
};

const authReducer = (state = initialState, action) => {
    console.log("enter auth reducer");
    switch (action.type) {
        case 'SET_USER_DATA':
            console.log("set_userdata_reducer");
            return { user: action.payload };
    }

    return state;
}

export default authReducer;