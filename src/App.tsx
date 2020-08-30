import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Preloader from "./components/preloader/Preloader";
import {connect, useDispatch} from 'react-redux';
import {getHeader, isPending} from "./state/initial-selector";
import {GlobalStateType} from "./state/root-reducer";
import {initialiseApp} from "./state/appReducer";
import {useRoutes} from "./routes";
import {signIn} from "./state/authReducer";

const App = (props:any) => {
    const {initialiseApp} = props
    const dispatch = useDispatch()
    const Logout = () => {
        localStorage.removeItem('userData')
        dispatch(signIn({userId: 0, isAuth: false}))
    }
    const [pend, setPend] = useState(true)
    const routs = useRoutes(props.isAuth, props.header, Logout)
    const allPromiseRejection = (promiseRejectionEvent: any) =>{
        alert(promiseRejectionEvent)
    }
    useEffect( () => {
        initialiseApp()
        // window.addEventListener('unhandledrejection', allPromiseRejection)
        // return () => {
        //     window.removeEventListener('unhandledrejection', allPromiseRejection)
        // }
    }, [initialiseApp])
    setTimeout(()=>{
        setPend(false)
    }, 1000)
    if (pend) {
        return <div style={{height: '100vh'}}><Preloader/></div>
    }

    return (
        <div className="App">
            <Router>
                {routs}
            </Router>
        </div>
    );
}



export default connect((state: GlobalStateType) => {
    return {
        isPending: isPending(state),
        isAuth: state.auth.isAuth,
        header: getHeader(state)
    }
},{initialiseApp})(App);
