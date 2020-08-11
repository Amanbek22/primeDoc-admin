import React from 'react'
import {Redirect, Route, Switch} from "react-router-dom";
import {EnterCode, ForgotPassword, NewPassword, SignInForm} from "./components/loginPage/signInForms";
import LoginPage from "./components/loginPage/loginPage";
import AdminPage from "./components/admin/AdminPage";
import NavBar from "./components/navbar/Navbar";
import {AdminHeader, AdminWrapper, Line} from "./components/mainStyledComponents/MainStyledComponents";
import MedCarts from "./components/med-cards/MedCards";
import Faq from "./components/FAQ/FAQ";
import Personal from "./components/personal/Personal";
import AboutUs from "./components/about-us/AboutUs";
import Chat from "./components/chat/Chat";
import ClinicDirection from "./components/ClinicDirection/ClinicDirection";
import logout from './img/logout.png'
import changePassword from './img/changePassword.png'
// import AddDoctor from "./components/add-doctor/AddDoctor";
import CreateTimeTable from "./components/create-time-table/CreateTimeTable";
import CreatePersonal from "./components/CreatePersonal/CreatePerssonal";
import Payment from "./components/payment/Payment";
import Payments from "./components/payment/Payments";
import PaymentDetail from "./components/payment/PaymentDetail";

export const useRoutes = (isAuth: boolean, header: string, Logout: ()=> void) => {
    if (isAuth) {
        return (
            <div>
                <NavBar/>
                <Switch>
                    <AdminWrapper>
                        <AdminHeader>
                            <span>
                                {header}
                            </span>
                            <div>
                                <div>
                                    <img src={changePassword} alt="#"/>
                                    <span>Сменить пароль</span>
                                </div>
                                <div onClick={Logout}>
                                    <img src={logout} alt="#"/>
                                    <span>Выйти</span>
                                </div>
                            </div>
                        </AdminHeader>
                        <Line/>
                        <Route exact path={'/clinic'}>
                            <AdminPage/>
                        </Route>
                        {/*<Route exact path={'/add/time/'}>*/}
                        {/*    <CreateTimeTable />*/}
                        {/*</Route>*/}
                        {/*<Route exact path={'/clinic/:id/:id'}>*/}
                        {/*    /!*<AddDoctor/>*!/*/}
                        {/*    <CreatePersonal />*/}
                        {/*</Route>*/}
                        <Route exact path={'/clinic/:id'}>
                            <ClinicDirection/>
                        </Route>
                        <Route path={'/card'}>
                            <MedCarts/>
                        </Route>
                        <Route exact path={'/personal'}>
                            <Personal/>
                        </Route>
                        <Route exact path={'/personal/:id'}>
                            <CreatePersonal />
                        </Route>
                        <Route exact path={'/personal/:id/:time'}>
                            <CreateTimeTable />
                        </Route>
                        <Route path={'/FAQ'}>
                            <Faq/>
                        </Route>
                        <Route path={'/about-us'}>
                            <AboutUs/>
                        </Route>
                        <Route path={'/chat'}>
                            <Chat/>
                        </Route>
                        <Route exact path={'/payment/'}>
                            <Payments />
                        </Route>
                        <Route exact path={'/payment/:add'}>
                            <Payment />
                        </Route>
                        <Route exact path={'/payment/detail/:id'}>
                            <PaymentDetail />
                        </Route>
                        {/*<Redirect to={'/clinic'}/>*/}
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
