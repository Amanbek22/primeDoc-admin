import {checkToken} from "../../state/authReducer";
import api from '../../api/Api'
import {AxiosResponse} from "axios";

const INITIALIZE = "reservation/INITIALIZE"
const SET_PAGE = "reservation/SET_PAGE"
const SET_PENDING = "reservation/SET_PENDING"

const initialState = {
    data: [],
    page: 0,
    pagination: 0,
    pending: true
}
type InitialStateType = typeof initialState

export const reservation = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZE:
            return {
                ...state,
                data: action.data.content,
                pagination: action.data.totalPages,
                pending: false
            }
        case SET_PENDING:
            return  {
                ...state,
                page: 0,
                pagination: 0,
                pending: action.pending,
            }
        case SET_PAGE:
            return  {
                ...state,
                page: action.page
            }
        default:
            return {
                ...state
            }
    }
}
export const setPageAC = (page: number) => {
    return {
        type: SET_PAGE,
        page
    }
}
const setData = (data:AxiosResponse) => {
    return {
        type: INITIALIZE,
        data: data.data,
    }
}
export const setPending = (payload:boolean) => {
    return {
        type : SET_PENDING,
        pending: payload
    }
}
export const getReservation = (page:number) => async (dispatch:any) => {
    await dispatch(checkToken(()=> api.getReservation(page)))
        .then((res: AxiosResponse)=>{
            dispatch(setData(res))
        })
}