import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import {BtnFloat, EditDelete, GreenBtn, Input} from "../mainStyledComponents/MainStyledComponents";
import css from './faq.module.css'

const Faq = () => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        dispatch(setHeader("FAQ"))
    }, [dispatch])
    return (
        <div className={css.wrapper}>
            <List/>
            <List/>
            <List/>
            <BtnFloat>
                <GreenBtn onClick={() => setVisible(!visible)}>Добавить вопрос</GreenBtn>
            </BtnFloat>
            <div>
                {
                    visible
                        ? <form>
                        <span className={css.formWrapper}>
                            <label>
                                Вопрос
                                <Input/>
                            </label>
                            <label>
                                Ответ
                                <Input/>
                            </label>
                        </span>
                            <BtnFloat>
                                <GreenBtn>Сохранить</GreenBtn>
                            </BtnFloat>
                        </form>
                        : null

                }
            </div>
        </div>
    )
}

function useOuterClick(callback: any) {
    const innerRef = useRef();
    const callbackRef = useRef();

    // set current callback in ref, before second useEffect uses it
    useEffect(() => { // useEffect wrapper to be safe for concurrent mode
        callbackRef.current = callback;
    });

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);

        function handleClick(e: any) {
            // @ts-ignore
            if (innerRef.current && callbackRef.current && !innerRef.current.contains(e.target)) {
                // @ts-ignore
                callbackRef.current(e);
            }
        }
    }, []);

    return innerRef; // return ref; client can omit `useRef`
}

const List = () => {
    const [visible, setVisible] = useState(false)
    const innerRef = useOuterClick((e: any) => {
        setVisible(false)
    });
    return (
        // @ts-ignore
        <div ref={innerRef} className={css.questionWrapper}>
            <div onClick={() => setVisible(!visible)} className={css.question}>
                <span className={css.q}>Как записаться на прием?  Как записаться на прием?</span>
                <div>
                    {
                        visible
                            ? <div className={css.answer + ' ' + visible ? css.animate : ''}>
                                Да. PrimeDoc набирает исключительно
                                опытных врачей. Средний стаж работы наших врачей - 12 лет.
                            </div>
                            : null
                    }
                </div>
            </div>
            <span>
                <EditDelete>
                        <img src={edit} alt="edit"/>
                        <img src={del} alt="delete"/>
                </EditDelete>
            </span>
        </div>
    )
}


export default Faq
