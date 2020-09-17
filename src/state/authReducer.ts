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

export const authFc = (password: string, log: string) => async (dispatch: any,) => {
    dispatch(initialise(true))
    let a = false
    await api.signIn({username: log, password: password})
        .then((res) => {
                dispatch(signIn({
                    userId: 1,
                    isAuth: true
                }))
                localStorage.setItem(storageName, JSON.stringify({
                    access_token: res.data.accessToken,
                    refresh_token: res.data.refreshToken,
                    access_life: res.data.tokenExpirationTime,
                    refresh_life: res.data.refreshExpirationTime,
                    chatToken: res.data.chatToken
                }))
                dispatch(getDirections())
                // dispatch(getIllness())
                a = true
            },
            (error) => {
                console.log(error)
                a = false
            })
    dispatch(initialise(false))
    return a
}

export const setDataRefresh = () => async (dispatch: any) => {
    const userData = JSON.parse(localStorage.getItem('userData') as string)

    const res = await api.refreshToken({
        username: 'primecdoctor@gmail.com',
        accessToken: userData.access_token,
        refreshToken: userData.refresh_token
    });
    localStorage.setItem(storageName, JSON.stringify({
        access_token: res.data.accessToken,
        refresh_token: res.data.refreshToken,
        access_life: res.data.tokenExpirationTime,
        refresh_life: res.data.refreshExpirationTime,
        chatToken: res.data.chatToken
    }))
    dispatch(signIn({
        isAuth: true
    }))
}


export const checkToken = (req: any) =>  async (dispatch: any) => {
    let token = JSON.parse(localStorage.getItem('userData') as string);
    const now = new Date()
    // console.log(new Date(token.refresh_life) > now )
    if ( token && new Date(token?.access_life) > now) {
        return  await req()
    } else if ( token && new Date(token?.refresh_life) > now) {
        // alert('refresh is bigger')
        console.log('refresh is bigger')
        await dispatch(setDataRefresh())
        return  await req()
    } else {
        dispatch(signIn({
            isAuth: false
        }))
        return new Error('Something went wrong')
    }
}