import { 
    BLOCKUSERSLIST,
    BLOCKUSERSLISTDONE,
    BLOCKEDBYUSERSLIST,
    BLOCKEDBYUSERSLISTDONE,
} from "../Constants";

const initialState = {
    blockedUsers : [],
    blockedByUsers: [],
    blockedUsersLoading:true,
    blockedByUsersLoading:true,
    blockedUsersFailed: false,
    blockedByUsersFailed: false,
    // loading:false,
}

export default (state = initialState, action) => {
    switch(action.type){
        case BLOCKUSERSLIST:
            return {...state,blockedUsersLoading:true}
        case BLOCKUSERSLISTDONE:
            return {...state, blockedUsers:action.payload, blockedUsersFailed: action.failed, blockedUsersLoading:false}
        case BLOCKEDBYUSERSLIST:
            return {...state,blockedByUsersLoading:true}
        case BLOCKEDBYUSERSLISTDONE:
            return {...state, blockedByUsers:action.payload, blockedByUsersFailed: action.failed, blockedByUsersLoading:false}
        default:
            return state;
    }
}