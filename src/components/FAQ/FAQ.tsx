import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {BtnFloat, GreenBtn, GreenDiv, Input} from "../mainStyledComponents/MainStyledComponents";
import css from './faq.module.css'
import api from "../../api/Api";
import Preloader from "../preloader/Preloader";
import {useFormik} from "formik";
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";
import DeleteModal from "../utils/DeleteModal";
import ModalWrapper from "../modal/Modal";
import EditDeleteComponent from "../utils/EditDelete";
import {checkToken} from "../../state/authReducer";


const validate = (values: any) => {
    const errors: any = {};
    if (!values.question) {
        errors.question = 'Обязательное поле';
    } else if (values.question.length <= 0) {
        errors.question = 'Обязательное поле'
    }

    if (!values.answer) {
        errors.answer = 'Обязательное поле';
    } else if (values.answer.length <= 0) {
        errors.answer = 'Обязательное поле'
    }

    return errors;
};

const Faq = React.memo(() => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [pending, setPending] = useState(true)
    const [questions, setQuestions] = useState([])
    const [change, setChange] = useState(false)

    useEffect(() => {
        dispatch(setHeader("FAQ"))
    }, [dispatch])
    const requestCheck = async (req: any) => {
        return dispatch(checkToken(req))
    }

    function compare(a: any, b: any) {
        const bandA = a.order
        const bandB = b.order
        let comparison = 0;
        if (bandA > bandB) {
            comparison = 1;
        } else if (bandA < bandB) {
            comparison = -1;
        }
        return comparison;
    }

    useEffect(() => {
        requestCheck(api.getFaq).then((res: any) => {
            const data = res.data.sort(compare)
            setQuestions(data)
            setPending(false)
        }, (error: any) => console.error(error))
    }, [pending])

    const formik = useFormik({
        initialValues: {
            question: "",
            answer: "",
            order: questions.length + 1
        },
        validate,
        onSubmit: async (values: any) => {
            requestCheck(() => api.createFaq(values))
                .then((res: any) => {
                    requestCheck(api.getFaq).then((res: any) => {
                        const data = res.data.sort(compare)
                        setQuestions(data)
                        setVisible(false)
                        values.question = ''
                        values.answer = ''
                    }, (error: any) => console.error(error))
                }, (error) => console.error(error))
        }
    })

    function onChange(sourceId: any, sourceIndex: any, targetIndex: any,) {
        const nextState = swap(questions, sourceIndex, targetIndex);
        const newArr = nextState.map((item: any, index: number) => {
            return {
                ...item,
                order: index
            }
        })
        // @ts-ignore
        setQuestions(newArr);
    }

    const changeSubmit = () => {
        let newArr = questions.map((item: any) => ({
            id: item.id,
            order: item.order
        }))
        newArr.sort((a: any, b: any) => a.id - b.id)
        requestCheck(() => api.orderFaq(newArr))
            .then((res) => console.log(res))
    }
    const wrapper: any = useRef(null)
    const scrollToBottom = () => {
        const scrollHeight = wrapper?.current?.scrollHeight;
        const height = wrapper?.current?.clientHeight;
        if (wrapper.current) wrapper.current.scrollTop = scrollHeight - height
    }
    if (pending) {
        return <Preloader/>
    }
    return (
        <div ref={wrapper} className={css.wrapper}>
            <BtnFloat>
                {
                    change
                        ? <GreenBtn onClick={() => {
                            setChange(!change)
                            changeSubmit()
                        }}>Сохранить</GreenBtn>
                        : <GreenBtn onClick={() => setChange(!change)}>Изменить порядок</GreenBtn>
                }
            </BtnFloat>
            {
                !change
                    ? questions.map((item: any) => <List setPending={() => setPending(true)} answer={item.answer}
                                                         id={item.id} questions={item.question}
                                                         key={item.id}/>)
                    : <GridContextProvider onChange={onChange}>
                        <GridDropZone
                            id="items"
                            boxesPerRow={1}
                            rowHeight={100}
                            className={css.gridDropZone}
                            style={{height: "400px"}}
                        >
                            {questions.map((item: any) => <GridItem className={css.q} key={item.id}>
                                    <List setPending={() => setPending(true)} noItem={true} noClick={true} answer={item.answer}
                                          id={item.id}
                                          questions={item.question} key={item.id}/>
                                </GridItem>
                            )}
                        </GridDropZone>
                    </GridContextProvider>
            }
            <div>
                {
                    visible
                        ? <form onSubmit={formik.handleSubmit}>
                        <span className={css.formWrapper}>
                            <label>
                                <span>
                                    <span>Вопрос</span>
                                    <span
                                        className={css.error}>{formik.errors.question ? <>{formik.errors.question}</> : null}</span>
                                </span>
                                <Input name={'question'} onBlur={formik.handleBlur} value={formik.values.question}
                                       onChange={formik.handleChange}/>
                            </label>
                            <label>
                                <span>
                                    <span>Ответ</span>
                                    <span
                                        className={css.error}>{formik.errors.answer ? <>{formik.errors.answer}</> : null}</span>
                                </span>
                                <Input name={'answer'} onBlur={formik.handleBlur} value={formik.values.answer}
                                       onChange={formik.handleChange}/>
                            </label>
                        </span>
                            <div className={css.btnWrapper}>
                            <span className={css.cancel}>
                                <BtnFloat onClick={()=>setVisible(!visible)}>
                                    <GreenDiv background={'#fe4242'}>Cancel</GreenDiv>
                                </BtnFloat>
                            </span>
                                <BtnFloat>
                                    <GreenBtn>Сохранить</GreenBtn>
                                </BtnFloat>
                            </div>
                        </form>
                        : <BtnFloat>
                            <GreenBtn onClick={() => {
                                setVisible(!visible)
                            }}>Добавить вопрос</GreenBtn>
                        </BtnFloat>
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
    noItem?: boolean
    noClick?: boolean
    setPending: () => void
}
const List: React.FC<ListProps> = (props) => {
    const [visible1, setVisible1] = useState(false)
    const innerRef = useOuterClick((e: any) => {
        setVisible(false)
    });
    const dispatch = useDispatch()
    const requestCheck = async (req: any) => {
        return dispatch(checkToken(req))
    }
    const onDelete = () => {
        requestCheck(() => api.deleteFaq(props.id))
            .then((res: any) => {
                    console.log(res)
                    props.setPending()
                },
                (error: any) => {
                    console.error(error)
                }
            )
    }
    const [visible, setVisible] = useState(false)
    const [editing, setEditing] = useState(false)
    const onModal = () => setVisible(!visible)
    const onEdit = () => setEditing(!editing)
    const setFaq = () => {
        onEdit()
    }
    return (
        // @ts-ignore
        <div ref={innerRef} className={css.questionWrapper}>
            <div
                onClick={() => props.noClick ? null : setVisible1(!visible1)}
                className={css.question}>
                <span className={css.q}>{props.questions}</span>
                <div>
                    {
                        visible1
                            ? <div className={css.answer + ' ' + visible1 ? css.animate : ''}>{props.answer}</div>
                            : null
                    }
                </div>
            </div>
            <span>
                {
                    props.noItem ? null :
                        <EditDeleteComponent noEdit={true} editing={editing} onEdit={onEdit} onModal={onModal}
                                             onDone={setFaq}/>
                }
            </span>
            <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"400"} onClickAway={onModal}>
                <DeleteModal text={'Вы уверены что хотите удалить'} onModal={onModal} title={props.questions}
                             del={onDelete}/>
            </ModalWrapper>
        </div>
    )
}

export default Faq
