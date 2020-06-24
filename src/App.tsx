import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Preloader from "./components/preloader/Preloader";
import {connect} from 'react-redux';
import {getToken, isPending} from "./state/initial-selector";
import {GlobalStateType} from "./state/root-reducer";
import {initialise} from "./state/appReducer";
import {useRoutes} from "./routes";

const App = (props:any) => {
    const routs = useRoutes(props.isAuth)
    const allPromiseRejection = (promiseRejectionEvent: any) =>{
        alert(promiseRejectionEvent)
    }
    useEffect( () => {
        // props.initialise(false)
        window.addEventListener('unhandledrejection', allPromiseRejection)
        return () => {
            window.removeEventListener('unhandledrejection', allPromiseRejection)
        }
    }, [props])


    if (props.isPending) {
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
        token: getToken(state),
        isPending: isPending(state),
        isAuth: state.auth.isAuth
    }
},{initialise})(App);
