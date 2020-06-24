import React, {createRef, useEffect, useState} from 'react'
import {LinksWrapper, LogoWrapper, Navbar} from "./NavbarComponents";
import logo from '../../img/WhiteLogo.png'
import {NavLink, withRouter} from "react-router-dom";
import css from "./navbar.module.css";
import medCart from '../../img/MedKarta.png'
import addUser from '../../img/add-user.png'
import FAQ from '../../img/FAQ.png'
import about from '../../img/about-us.png'
import chat from '../../img/chat.png'
import clinic from '../../img/Клиника.png'
import logout from '../../img/logout.png'


const NavBar = (props: any) => {
    const links: any = createRef()
    const [index, setIndex] = useState<null | number>(null)

    useEffect(() => {
        const elements = [...links.current.children]

        elements.forEach((item: HTMLElement, index: number) => {
            if (item.classList.length) {
                if (item.classList[0] === 'activeLink') {
                    setIndex(index)
                }
            }
        })
    }, [links, props])

    useEffect(() => {
        if (index) {
            const elements = [...links.current.children]
            elements.forEach((item: HTMLElement, i: number) => {
                if (i === index + 1) {
                    links.current.children[i].classList.remove('prev', 'next')
                    links.current.children[index + 1].classList.add("next");
                } else if (i === index - 1) {
                    links.current.children[i].classList.remove('prev', 'next')
                    links.current.children[index - 1].classList.add("prev");
                } else {
                    links.current.children[i].classList.remove('prev', 'next')
                }
            })
        }
    }, [index, links])

    return (
        <Navbar>
            <LogoWrapper>
                <img src={logo} alt="PDOC"/>
            </LogoWrapper>
            <LinksWrapper ref={links}>
                <span className={css.spans}/>
                <NavLink activeClassName={'activeLink'} to={'/admin'}>
                    <img src={clinic} alt="#"/>
                    Клиника
                </NavLink>
                <NavLink to={'/card'} activeClassName={'activeLink'}>
                    <img src={medCart} alt="#"/>
                    Мед карта
                </NavLink>
                <NavLink to={'/create'} activeClassName={'activeLink'}>
                    <img src={addUser} alt="#"/>
                    Создать пользователя
                </NavLink>
                <NavLink to={'/FAQ'} activeClassName={'activeLink'}>
                    <img src={FAQ} alt="#"/>
                    FAQ
                </NavLink>
                <NavLink to={'/about-us'} activeClassName={'activeLink'}>
                    <img src={about} alt="#"/>
                    О нас
                </NavLink>
                <NavLink to={'/chat'} activeClassName={'activeLink'}>
                    <img src={chat} alt="#"/>
                    Чат
                </NavLink>
                <span className={css.spans}/>
            </LinksWrapper>
            <div className={css.logout}>
                <span>
                    <img src={logout} alt="#"/>
                    Выйти
                </span>
            </div>
        </Navbar>
    )
}


export default withRouter(NavBar)
