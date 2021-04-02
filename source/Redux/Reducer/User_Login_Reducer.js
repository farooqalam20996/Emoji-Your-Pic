import { User_Login, Login_Failed, Login_Success, User_Data, User_Token } from "../Constants";

const initialState = {
    Loader:false,
    loginFailed:false,
    user:'',
    token:'',
    error:"",
}

export default(state=initialState, action)=>{
    switch (action.type) {
        case User_Login:
            return{ ...state, Loader:true, error:'', loginFailed:false }
        
        case Login_Success:
            return{ ...state, Loader:false, error:''}
        
        case Login_Failed:
            return{ ...state,Loader:false, loginFailed:true, error:action.error}

        case User_Data:
            return{ ...state, user:action.user}

        case User_Token:
            return{ ...state, token:action.payload}
    
        default:
            return state;
    }
}