import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import Preloader from "./components/preloader/Preloader";
import {connect} from 'react-redux';
import {authFc} from "./state/authReducer";
import {getToken, isPending} from "./state/initial-selector";
import {GlobalStateType} from "./state/root-reducer";
import {initialise} from "./state/appReducer";

const App = (props:any) => {
    const {login} = useAuth()
    const allPromiseRejection = (promiseRejectionEvent: any) =>{
        alert(promiseRejectionEvent)
    }
    useEffect( () => {
        props.initialise()
        window.addEventListener('unhandledrejection', allPromiseRejection)
        return () => {
            window.removeEventListener('unhandledrejection', allPromiseRejection)
        }
    }, [props])

    const log = async (password: string, log: string) => {
        const res = await props.authFc('n1n2n3n4', 'Aman')
        console.log(res)
        login(res.refresh, 5)
    }
    if (props.isPending) {
        return <div style={{height: '100vh'}}><Preloader/></div>
    }

    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path={'/'}>
                        <button onClick={() => log('adgdag', 'sagfsdg')}>LOGIN</button>
                        {/*<input type="file" />*/}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}



export default connect((state: GlobalStateType) => {
    return {
        token: getToken(state),
        isPending: isPending(state)
    }
},{initialise, authFc})(App);
