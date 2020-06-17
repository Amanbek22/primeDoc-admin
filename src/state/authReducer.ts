import api from '../api/Api'

const IS_AUTHENTICATED = 'auth/IS_AUTHENTICATED'
const IS_PENDING = 'auth/IS_PENDING'
const AUTHORIZATION = 'auth/AUTHORIZATION'


const initialState = {
    token: null,
    userId: null,
    isAuth: false,
    pending: false
}

type InitialStateType = typeof initialState

export const auth = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuth: action.data
            }
        case IS_PENDING:
            return {
                ...state,
                pending: action.isPending
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


export const pend = (isPending: boolean) => {
    return {
        type: "IS_PENDING",
        isPending: isPending
    }
}

const signIn = (payload: any) => {
    return {
        type: "AUTHORIZATION",
        payload
    }
}

export const authFc = (password: string, log: string) => async (dispatch: any, ) =>{
    dispatch(pend(true))
    const res = await api.signIn({username: log, password})
    dispatch(signIn({
        token: res.data.refresh,
        userId: res.data.access,
        isAuth: true
    }))
    dispatch(pend(false))
    return res.data
}
