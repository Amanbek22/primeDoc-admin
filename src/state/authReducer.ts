import api from '../api/Api'
import {getDirections, getIllness, initialise} from "./appReducer";


const storageName = 'userData'

const IS_AUTHENTICATED = 'auth/IS_AUTHENTICATED'
const AUTHORIZATION = 'auth/AUTHORIZATION'


const initialState = {
    userId: null,
    isAuth: false
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
        type: AUTHORIZATION,
        payload
    }
}

export const authFc = (password: string, log: string) => (dispatch: any,) => {
    dispatch(initialise(true))
    api.signIn({username: log, password: password})
        .then((res: any) => {
                dispatch(signIn({
                    userId: 1,
                    isAuth: true
                }))
                localStorage.setItem(storageName, JSON.stringify({
                    access_token: res.data.token,
                    refresh_token: res.data.token,
                    access_life: res.data.expirationTime,
                    refresh_life: res.data.expirationTime
                }))
                dispatch(getDirections())
                dispatch(getIllness())
                return true
            },
            (error: any) => {
                console.log(error)
            })
    dispatch(initialise(false))
    return true
}

export const setDataRefresh = () => async (dispatch: any) => {
    const res = await api.refreshToken();
    const access_life = res.data.expirationTime
    const userData = JSON.parse(<string>localStorage.getItem('userData'))
    const { refresh_token,  refresh_life} = userData;
    localStorage.setItem('userData', JSON.stringify({
        access_token: res.data.access,
        refresh_token: refresh_token,
        access_life: access_life,
        refresh_life: refresh_life
    }))
    dispatch(signIn({
        isAuth: true
    }))
}


export const checkToken = (req: any) =>  async (dispatch: any) => {
    let token = JSON.parse(localStorage.getItem('userData') as string);
    const now = new Date()
    if ( token && new Date(token.access_life) > now) {
        return  await req
    } else if ( token && new Date(token.refresh_life) > now) {
        console.log('refresh is bigger')
        await dispatch(setDataRefresh())
        return  await req
    } else {
        return new Error('Something went wrong')
    }
}