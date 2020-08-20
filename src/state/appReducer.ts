import {checkToken, signIn} from "./authReducer";
import api from '../api/Api'

const INITIALIZE_SUCCEED = "app/INITIALIZE_SUCCEED";
const SET_HEADER = "app/SET_HEADER";
const SET_DIRECTIONS = "app/SET_DIRECTIONS"
const SET_USERS = "app/SET_USERS"
const DIRECTION_EDIT = "app/DIRECTION_EDIT"
const SET_ILLNESS = "app/SET_ILLNESS"
const ADD_DIRECTION = "app/ADD_DIRECTION"
const REMOVE_DIRECTION = "app/REMOVE_DIRECTION"

const initialState = {
    pending: true,
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
        case ADD_DIRECTION:
            return {
                ...state,
                // @ts-ignore
                directions: [...state.directions, action.data]
            }
        case REMOVE_DIRECTION:
            let arr = state.directions
            arr.splice(action.index, 1)
            return {
                ...state,
                directions: [...arr]
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
                directions: action.payload,
                pending: false
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
export const addDirection = (data:any) => {
    return {
        type: ADD_DIRECTION,
        data
    }
}
export const removeDirection = (index:number) => {
    return {
        type: REMOVE_DIRECTION,
        index
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
export const setIllnesses = (data:any) => {
    return {
        type: SET_ILLNESS,
        data: data
    }
}


export const getDirections = () => async (dispatch: any) => {
    dispatch(checkToken(api.getCategory()))
        .then((res: any) => {
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
            dispatch(setIllnesses(res.data))
        },
            (error: any) => {
                console.log(error)
            })
}

export const initialiseApp = () => async (dispatch: any) => {
    let data = JSON.parse(localStorage.getItem('userData') as string);
    if (data && data.refresh_token) {
        if (new Date(data.refresh_life) > new Date()) {
            dispatch(signIn({
                isAuth: true
            }))
            dispatch(getIllness())
            dispatch(getDirections())
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
