import { API } from '../../Routes_Navigation/MainURL';
import {
    BLOCKUSERSLIST,
    BLOCKUSERSLISTDONE,
    BLOCKEDBYUSERSLIST,
    BLOCKEDBYUSERSLISTDONE,
} from '../Constants';
var axios = require('axios');

export const getBlockedUsersList = (token) => {
    return function (dispatch) {
        dispatch({
            type: BLOCKUSERSLIST,
        })
        var config = {
            method: 'get',
            url:API+'salvador_app/public/api/blocked-user-list',
            headers: { 
                'Authorization': token
            }
        };
    
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.success){
                dispatch({
                    type:BLOCKUSERSLISTDONE,
                    payload: response.data.data,
                    // failed: false,
                })
            }
            else{
                dispatch({
                    type:BLOCKUSERSLISTDONE,
                    payload: [],
                    // failed: false,
                })
            }
        })
        .catch(function (error) {
            console.log(error);
            dispatch({
                type:BLOCKUSERSLISTDONE,
                payload: [],
                failed: true,
            })
        });
    }
}

export const getBlockedByUsersList = (token) => {
    return function(dispatch){
        dispatch({
            type: BLOCKEDBYUSERSLIST,
        })
        var config = {
            method: 'get',
            url: API+'salvador_app/public/api/blocked-list-by-user',
            headers: { 
              'Authorization': token
            }
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.success){
                dispatch({
                    type:BLOCKEDBYUSERSLISTDONE,
                    payload: response.data.data,
                })
            }
            else{
                dispatch({
                    type:BLOCKEDBYUSERSLISTDONE,
                    payload: [],
                })
            }
          })
          .catch(function (error) {
            dispatch({
                type:BLOCKEDBYUSERSLISTDONE,
                payload: [],
                failed: true,
            })
          });
    }
}