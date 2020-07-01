import {GlobalStateType} from './root-reducer'

export const getToken = (state: GlobalStateType) => state.auth.token

export const getHeader = (state: GlobalStateType) => state.app.header

export const isPending = (state: GlobalStateType) => state.app.initialise
