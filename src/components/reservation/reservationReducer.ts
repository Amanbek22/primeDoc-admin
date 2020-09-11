import {checkToken} from "../../state/authReducer";
import api from '../../api/Api'
import {AxiosResponse} from "axios";

const INITIALIZE = "reservation/INITIALIZE"

const initialState = {
    data: []
}
type InitialStateType = typeof initialState

export const reservation = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZE:
            return {
                ...state,
                data: action.data
            }
        default:
            return {
                ...state
            }
    }
}

const setData = (data:AxiosResponse) => {
    return {
        type: INITIALIZE,
        data
    }
}
export const getReservation = () => (dispatch:any) => {
    dispatch(checkToken(api.getReservation))
        .then((res: AxiosResponse)=>{
            dispatch(setData(res.data))
        })
}