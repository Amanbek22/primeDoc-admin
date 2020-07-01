import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {GlobalStateType} from "../state/root-reducer";



export const WithAuthRedirect = (Component:any) => {
    const RedirectComponent = (props:any) => {
        if(props.data.isAuth === true) return <Redirect to={'/admin'} />
        return <Component {...props}/>
    }
    const mapStateToProps = (state: GlobalStateType)=> {
        return {
            data: state.auth
        }
    }
    return connect(mapStateToProps,{})(RedirectComponent);
}



export const WithNotAuthRedirect = (Component: any) => {
    const RedirectComponent = (props:any) => {
        if(props.data.isAuth === false) return <Redirect to={'/'} />
        return <Component {...props}/>
    }
    const mapStateToProps = (state: GlobalStateType) => {
        return {
            data: state.auth
        }
    }
    return connect(mapStateToProps, {})(RedirectComponent)
}
