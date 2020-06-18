
const INITIALIZE_SUCCEED = "app/INITIALIZE_SUCCEED";


const initialState = {
    initialise: false,
}
type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCEED:
            return {
                ...state,
                initialise: action.isPending
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
