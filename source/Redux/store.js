import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import SignUp_Reducer from "./Reducer/User_SignUp_Reducer";
import Login_Reducer from "./Reducer/User_Login_Reducer";
import EmailVerify_Reducer from "./Reducer/EmailRegistration_Reducer";

const rootReducer = combineReducers(
    {
        SignUp_Reducer:SignUp_Reducer,
        Login_Reducer:Login_Reducer,
        EmailVerify:EmailVerify_Reducer,
    }
)

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;