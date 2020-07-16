import {checkToken, signIn} from "./authReducer";
import api from '../api/Api'

const INITIALIZE_SUCCEED = "app/INITIALIZE_SUCCEED";
const SET_HEADER = "app/SET_HEADER";
const SET_DIRECTIONS = "app/SET_DIRECTIONS"
const SET_USERS = "app/SET_USERS"
const DIRECTION_EDIT = "app/DIRECTION_EDIT"
const SET_ILLNESS = "app/SET_ILLNESS"

const initialState = {
    initialise: false,
    header: 'Клиника',
    directions: [],
    users: [],
    illnesses: [],
    directionEdit: false,
}
type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCEED:
            return {
                ...state,
                initialise: action.isPending
            }
        case DIRECTION_EDIT:
            return {
                ...state,
                directionEdit: action.edit
            }
        case SET_ILLNESS:
            return {
                ...state,
                illnesses: action.data
            }
        case SET_HEADER:
            return {
                ...state,
                header: action.header
            }
        case SET_DIRECTIONS:
            return {
                ...state,
                directions: action.payload
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        default:
            return {
                ...state
            }
    }
}


export const initialise = (isPending: boolean) => {
    return {
        type: INITIALIZE_SUCCEED,
        isPending
    }
}


export const setHeader = (header: string) => {
    return {
        type: SET_HEADER,
        header
    }
}
export const setUsers = (users: any) => {
    return {
        type: SET_USERS,
        users
    }
}
export const editDirection = (edit:boolean) => {
    return {
        type: DIRECTION_EDIT,
        edit
    }
}
export const getUsers = () => (dispatch: any) => {
     dispatch(checkToken(api.getUser()))
        .then((res: any) => {
                dispatch(setUsers(res.data))
                return true
            },
            (error: any) => {
                console.error(error)
                return false
            }
        )
}

type SetDirectionActionType = { // action type of isAuth
    type: typeof SET_DIRECTIONS,
    payload: any
}
export const setDirections = (payload: any): SetDirectionActionType => {
    return {
        type: SET_DIRECTIONS,
        payload
    }
}


export const getDirections = () => async (dispatch: any) => {
    dispatch(checkToken(api.getCategory()))
        .then((res: any) => {
                // console.log(res)
                dispatch(setDirections(res.data))
            },
            (error: any) => {
                console.log(error)
            }
        )
}
export const getIllness = () => async (dispatch: any) => {
    dispatch(checkToken(api.getIllness()))
        .then((res:any)=> {
            console.log(res)
            dispatch({
                type: SET_ILLNESS,
                data: res.data
            })
        })
}

export const initialiseApp = () => async (dispatch: any) => {
    let data = JSON.parse(<string>localStorage.getItem('userData'));
    if (data && data.refresh_token) {
        if (new Date(data.refresh_life) > new Date()) {
            dispatch(signIn({
                isAuth: true
            }))
            dispatch(getDirections())
            dispatch(getIllness())
            dispatch(initialise(false))
        } else {
            localStorage.removeItem('userData')
            dispatch(signIn({
                isAuth: false
            }))
        }
    } else {
        dispatch(initialise(false))
    }
}
