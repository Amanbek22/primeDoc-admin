import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {EnterCode, ForgotPassword, NewPassword, SignInForm} from "./components/loginPage/signInForms";
import LoginPage from "./components/loginPage/loginPage";
import AdminPage from "./components/admin/AdminPage";
import NavBar from "./components/navbar/Navbar";
import {AdminWrapper} from "./components/mainStyledComponents/MainStyledComponents";
import MedCarts from "./components/med-cards/MedCards";
import Faq from "./components/FAQ/FAQ";

export const useRoutes = (isAuth: boolean) => {
    if (isAuth) {
        return (
            <div>
                <NavBar/>
                <Switch>
                    <AdminWrapper>
                        <Route exact path={'/admin'}>
                            <AdminPage/>
                        </Route>
                        <Route path={'/card'}>
                            <MedCarts />
                        </Route>
                        <Route path={'/create'}>
                            Create
                        </Route>
                        <Route path={'/FAQ'}>
                            <Faq/>
                        </Route>
                        <Route path={'/about-us'}>
                            about-us
                        </Route>
                        <Route path={'/chat'}>
                            chat
                        </Route>
                        <Redirect to={'/admin'}/>
                    </AdminWrapper>
                </Switch>
            </div>
        )
    }
    return (
        <Switch>
            <Route exact path={'/'}>
                <LoginPage>
                    <SignInForm/>
                </LoginPage>
            </Route>
            <Route exact path={'/forgot'}>
                <LoginPage>
                    <ForgotPassword/>
                </LoginPage>
            </Route>
            <Route exact path={'/code'}>
                <LoginPage>
                    <EnterCode/>
                </LoginPage>
            </Route>
            <Route exact path={'/new-password'}>
                <LoginPage>
                    <NewPassword/>
                </LoginPage>
            </Route>
            <Redirect to={'/'}/>
        </Switch>
    )
}
