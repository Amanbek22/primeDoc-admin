
const INITIALIZE_SUCCEED = "app/INITIALIZE_SUCCEED";


const initialState = {
    initialise: true,
}
type InitialStateType = typeof initialState

export const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case INITIALIZE_SUCCEED:
            return {
                ...state,
                initialise: false
            }
        default:
            return {
                ...state
            }
    }
}


export const initialise = () => {
    return {
        type: INITIALIZE_SUCCEED
    }
}
