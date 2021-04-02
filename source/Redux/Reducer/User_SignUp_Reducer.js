import { User_SignUp, User_SignUp_Success, User_SignUp_Failed, User_Name, Full_Name,Email, Password, Confirm_Password, Phone_Number, Image_Uri } from "../Constants";

const initialState={
    id:0,
    username:"",
    fullname:"",
    email:"",
    password:"",
    confirm_password:"",
    phone_number:"",
    ImageUri:"",
    loader:false,
    failed:false,
}

export default( state=initialState, action )=> {
    switch (action.type) {
        case User_Name:
          return { ...state, username:action.payload }  
        
        case Full_Name:
            return{ ...state, fullname:action.payload }
    
        case Email:
            return { ...state, email:action.payload}    
            
        case Password:
            return{ ...state, password:action.payload}

        case Confirm_Password:
            return{ ...state, confirm_password:action.payload}

        case Phone_Number:
            return{ ...state, phone_number:action.payload}
        
        case Image_Uri:
            return{ ...state , ImageUri:action.payload }

        case User_SignUp:
            return{ ...state, loader:true }

        case User_SignUp_Success:
            return{ ...state, ...initialState, loader:false }

        case User_SignUp_Failed:
            return{ ...state, failed:true, loader:false }

        default:
            return state;
    }

}