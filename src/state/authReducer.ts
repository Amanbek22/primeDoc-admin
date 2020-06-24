import api from '../api/Api'
import {initialise} from "./appReducer";

const IS_AUTHENTICATED = 'auth/IS_AUTHENTICATED'
const AUTHORIZATION = 'auth/AUTHORIZATION'


const initialState = {
    token: null,
    userId: null,
    isAuth: true
}

type InitialStateType = typeof initialState

export const auth = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuth: action.data
            }
        case AUTHORIZATION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return {
                ...state
            }
    }
}




export const signIn = (payload: any) => {
    return {
        type: "auth/AUTHORIZATION",
        payload
    }
}

export const authFc = (password: string, log: string) => async (dispatch: any, ) =>{
    dispatch(initialise(true))
    const res = await api.signIn({username: log, password})
    dispatch(signIn({
        token: res.data.refresh,
        userId: res.data.access,
        isAuth: true
    }))
    dispatch(initialise(false))
    return res.data
}
