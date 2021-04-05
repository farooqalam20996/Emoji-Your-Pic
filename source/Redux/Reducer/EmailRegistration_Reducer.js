import {Email, Email_Registration, Email_Failed, Email_Success } from "../Constants";

const initialState ={
    email:"",
    Loader:false,
    Failed:false,
}

export default( state=initialState , action )=>{
    switch (action.type) {
        case Email:
            return{...state, email:action.payload}

        case Email_Registration:
            return{ ...state, Loader:true }
        
        case Email_Success:
            return {...state , Loader:false}
    
        case Email_Failed:
            return{ ...state, ...initialState ,Loader:false}
        default:
            return state;
    }
}