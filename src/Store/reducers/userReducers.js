import { USER_DATA, UPDATE_USER_DATA, GET_USER_DATA } from "../../Action/type";

const INITIAL_STATE = {
    userdata: [],
    updateuserdata: [],
    GetData: [],
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case USER_DATA:
            return { ...state, userdata: action.payload };
        case UPDATE_USER_DATA:
            return { ...state, updateuserdata: action.payload }
        case GET_USER_DATA:
            return { ...state, GetData: action.payload }
        default:
            return state;
    }
};