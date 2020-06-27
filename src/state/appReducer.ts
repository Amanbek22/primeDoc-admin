
const INITIALIZE_SUCCEED = "app/INITIALIZE_SUCCEED";
const SET_HEADER = "app/SET_HEADER";


const initialState = {
    initialise: false,
    header: 'Клиника'
}
type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCEED:
            return {
                ...state,
                initialise: action.isPending
            }
        case SET_HEADER:
            return {
                ...state,
                header: action.header
            }
        default:
            return {
                ...state
            }
    }
}


export const initialise = (isPending:boolean) => {
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
