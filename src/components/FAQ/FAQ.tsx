import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import edit from "../../img/edit.png";
import del from "../../img/delete.png";
import {BtnFloat, EditDelete, GreenBtn, Input} from "../mainStyledComponents/MainStyledComponents";
import css from './faq.module.css'
import api from "../../api/Api";
import Preloader from "../preloader/Preloader";
import {useFormik} from "formik";


const validate = (values: any) => {
    const errors: any = {};
    if (!values.question) {
        errors.question = 'Required';
    } else if (values.question.length <= 0) {
        errors.question = 'Required'
    }

    if (!values.answer) {
        errors.answer = 'Required';
    } else if (values.answer.length <= 0) {
        errors.answer = 'Required'
    }

    // if (!values.email) {
    //     errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address';
    // }

    return errors;
};

const Faq = React.memo(() => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [pending, setPending] = useState(true)
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        dispatch(setHeader("FAQ"))
    }, [dispatch])

    useEffect(() => {
        api.getFaq().then((res: any) => {
            setQuestions(res.data)
            setPending(false)
        }, (error: any) => console.error(error))
    }, [])

    const formik = useFormik({
        initialValues: {
            question: "",
            answer: "",
            order: questions.length + 1
        },
        validate,
        onSubmit: async (values: any) => {
            api.createFaq(values)
                .then((res: any) => {
                    api.getFaq().then((res: any) => {
                        setQuestions(res.data)
                        setVisible(false)
                        values.question = ''
                        values.answer = ''
                    }, (error: any) => console.error(error))
                }, (error) => console.error(error))
        }
    })

    if (pending) {
        return <Preloader/>
    }

    return (
        <div className={css.wrapper}>
            {questions.map((item: any) => <List answer={item.answer} id={item.id} questions={item.question}
                                                key={item.id}/>)}
            <BtnFloat>
                <GreenBtn onClick={() => {

                    setVisible(!visible)
                }}>Добавить вопрос</GreenBtn>
            </BtnFloat>
            <div>
                {
                    visible
                        ? <form onSubmit={formik.handleSubmit}>
                        <span className={css.formWrapper}>
                            <label>
                                Вопрос
                                <Input name={'question'} onBlur={formik.handleBlur} value={formik.values.question}
                                       onChange={formik.handleChange}/>
                                {formik.errors.question ? <div>{formik.errors.question}</div> : null}
                            </label>
                            <label>
                                Ответ
                                <Input name={'answer'} onBlur={formik.handleBlur} value={formik.values.answer}
                                       onChange={formik.handleChange}/>
                                {formik.errors.answer ? <div>{formik.errors.answer}</div> : null}
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
})

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

type ListProps = {
    questions: string
    answer: string
    id: number
}
const List: React.FC<ListProps> = (props) => {
    const [visible, setVisible] = useState(false)
    const innerRef = useOuterClick((e: any) => {
        setVisible(false)
    });
    const onDelete = (id: number | string) => {
        api.deleteFaq(id)
            .then((res: any) => {

                },
                (error: any) => console.error(error)
            )
    }
    return (
        // @ts-ignore
        <div ref={innerRef} className={css.questionWrapper}>
            <div onClick={() => setVisible(!visible)} className={css.question}>
                <span className={css.q}>{props.questions}</span>
                <div>
                    {
                        visible
                            ? <div className={css.answer + ' ' + visible ? css.animate : ''}>{props.answer}</div>
                            : null
                    }
                </div>
            </div>
            <span>
                <EditDelete>
                        <img src={edit} alt="edit"/>
                        <img onClick={() => onDelete(props.id)} src={del} alt="delete"/>
                </EditDelete>
            </span>
        </div>
    )
}


export default Faq
