import {GlobalStateType} from './root-reducer'

export const getToken = (state: GlobalStateType) => state.auth.token

export const isPending = (state: GlobalStateType) => state.app.initialise
