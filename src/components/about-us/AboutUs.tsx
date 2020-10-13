import React, {useEffect, useState} from 'react'
import css from './about-us.module.css'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";
import {GreenBtn, GreenDiv, Input, TextArea} from "../mainStyledComponents/MainStyledComponents";
import api from '../../api/Api'
import EditDeleteComponent from "../utils/EditDelete";
import {useFormik} from "formik";
import ModalWrapper from "../modal/Modal";
import Preloader from "../preloader/Preloader";
import {checkToken} from "../../state/authReducer";
import delImage from '../../img/delete.png'
import {Title} from "../admin/AdminComponents";
import DeleteModal from "../utils/DeleteModal";

const PERSONAL_DATA = "PERSONAL_DATA"
const PAID_SERVICE = "PAID_SERVICE"
const CONTRACT_OFFER = "CONTRACT_OFFER"

const AboutUs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader("О нас"))
    }, [dispatch])
    const [data, setData] = useState<any>([])
    const [files, setFiles] = useState<any>([])
    const [file, setFile] = useState<any>(null)
    const [offerFile, setOfferFile] = useState<any>(null)
    const [personal_file, setPersonal_file] = useState<any>(null)
    const [pending, setPending] = useState(true)
    const getAboutUs = async (req: any) => {
        return dispatch(checkToken(req))
    }
    useEffect(() => {
        getAboutUs(api.getAboutUs)
            .then((res: any) => {
                setData(res.data)
                getAboutUs(api.getDocs)
                    .then((res: any) => {
                        setFiles(res.data)
                        setPending(false)
                    }, (error:any)=>{
                        setPending(false)
                    })
            })
    }, [pending])
    const saveFile = () => {
        setPending(true)
        const fileData = new FormData()
        fileData.append('file', file)
        getAboutUs(() => api.docsUpload(fileData, PAID_SERVICE))
            .then((res: any) => {
                console.log(res.data)
                setFile(null)
            })
    }
    const savePersonalFile = () => {
        setPending(true)
        const fileData = new FormData()
        fileData.append('file', personal_file)
        getAboutUs(() => api.docsUpload(fileData, PERSONAL_DATA))
            .then((res: any) => {
                setPersonal_file(null)
            })
    }
    const saveOfferFile = () => {
        setPending(true)
        const fileData = new FormData()
        fileData.append('file', offerFile)
        getAboutUs(() => api.docsUpload(fileData, CONTRACT_OFFER))
            .then((res: any) => {
                setOfferFile(null)
            })
    }
    const paid_service = files.map((item: any) => item.documentType === PAID_SERVICE ?
        <File setPending={setPending} key={item.id} id={item.id} code={item.code} type={item.documentType} name={item.fileName}/> : null).filter((item: any) => {
        if (item) {
            return item
        }
    })
    const personal_data = files.map((item: any) => item.documentType === PERSONAL_DATA ?
        <File setPending={setPending} key={item.id} id={item.id} code={item.code} type={item.documentType} name={item.fileName}/> : null).filter((item: any) => {
        if (item) {
            return item
        }
    })
    const offer = files.map((item: any) => item.documentType === CONTRACT_OFFER ?
        <File setPending={setPending} key={item.id} id={item.id} code={item.code} type={item.documentType} name={item.fileName}/> : null).filter((item: any) => {
        if (item) {
            return item
        }
    })
    if (pending) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={css.infoWrapper}>
                {
                    data.map((item: any) => <Part
                        key={item.id}
                        id={item.id}
                        order={item.order}
                        header={item.header}
                        paragraph={item.paragraph}/>)
                }
                <div>
                    <div className={css.contact}>Договор на оказание платных медицинских услуг</div>
                    {
                        !paid_service.length ? <div className={css.btnWrapper}>
                                {
                                    file
                                        ? <div>
                                            <div className={css.file__name}>
                                                <span>{file.name}</span>
                                            </div>
                                            <GreenBtn onClick={saveFile}>Сохранить</GreenBtn>
                                        </div>
                                        : <label className={css.fileLabel}>
                                            <input
                                                className={css.none} onChange={(e: any) => setFile(e.target.files[0])}
                                                type={'file'}
                                                // accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf,"
                                            />
                                            <div className={css.greenDiv}>Добавить файл</div>
                                        </label>
                                }
                            </div>
                            : <div className={css.files}>{paid_service}</div>
                    }
                </div>
                <div>
                    <div className={css.contact}>Соглашение на обработку персональных данных</div>
                    <div className={css.files}>{personal_data}</div>
                    {
                        !personal_data.length
                            ? <div className={css.btnWrapper}>
                                {
                                    personal_file
                                        ? <div>
                                            <div className={css.file__name}>
                                                <span>{personal_file.name}</span>
                                            </div>
                                            <GreenBtn onClick={savePersonalFile}>Сохранить</GreenBtn>
                                        </div>
                                        : <label>
                                            <input
                                                className={css.none}
                                                onChange={(e: any) => setPersonal_file(e.target.files[0])} type={'file'}
                                                // accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf,"
                                            />
                                            <div className={css.greenDiv}>Добавить файл</div>
                                        </label>
                                }
                            </div>
                            : null
                    }
                </div>
                <div>
                    <div className={css.contact}>Условия договора оферты</div>
                    <div className={css.files}>{offer}</div>
                    {
                        !offer.length ?
                            <div className={css.btnWrapper}>
                                {
                                    offerFile
                                        ? <div>
                                            <div className={css.file__name}>
                                                <span>{offerFile.name}</span>
                                            </div>
                                            <GreenBtn onClick={saveOfferFile}>Сохранить</GreenBtn>
                                        </div>
                                        : <label>
                                            <input
                                                className={css.none} onChange={(e: any) => setOfferFile(e.target.files[0])}
                                                type={'file'}
                                                // accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf,"
                                            />
                                            <div className={css.greenDiv}>Добавить файл</div>
                                        </label>
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

type FileProps = {
    type: string
    name: string
    code: string
    id: number
    setPending: any
}
const File = (props: FileProps) => {
    const dispatch = useDispatch()
    const reqCheck = async (req: any) => {
        return dispatch(checkToken(req))
    }
    const getFile = () => {
        get_file_url(`https://primedocapp.one:8443/api/v1/docs/download/${props.code}`)
    }
    const [visible, setVisible] = useState(false)
    const onModal = () => setVisible(!visible)
    function get_file_url(url: string) {
        let link_url: any = document.createElement("a");
        link_url.download = url.substring((url.lastIndexOf("/") + 1), url.length);
        link_url.href = url;
        document.body.appendChild(link_url);
        link_url.click();
        document.body.removeChild(link_url);
        link_url = null;
    }

    const del = async () => {
        onModal()
        let res = await reqCheck(()=> api.deleteDoc(props.type))
        props.setPending()
    }

    return (
        <div className={css.file__wrapper}>
            <div onClick={getFile} className={css.file}>
                <div className={css.fileWrapper}>
                    <img src="https://image.flaticon.com/icons/svg/2921/2921724.svg" alt="file"/>
                </div>
                <span>{props.name}</span>
            </div>
            <div onClick={onModal} className={css.delete}>
                <img src={delImage} alt=""/>
            </div>
            <ModalWrapper onModal={onModal} visible={visible} width={"450"} height={"400"} onClickAway={onModal}>
                <DeleteModal text={`Вы действительно хотите удолить файл: ${props.name}`} onModal={onModal} title={''}
                             del={del}/>
            </ModalWrapper>
        </div>
    )
}

type PartProps = {
    paragraph: string
    header: string
    id: number
    order: number
}
const Part = (props: PartProps) => {
    const [edit, setEdit] = useState(false)
    const onEdit = () => setEdit(!edit)
    const dispatch = useDispatch()
    const request = async (req: any) => {
        return dispatch(checkToken(req))
    }
    const formik = useFormik({
        initialValues: {
            paragraph: props.paragraph,
            header: props.header
        },
        // validate,
        onSubmit: (values) => {
            request(() => api.setAboutUs(props.id, {
                header: values.header,
                id: props.id,
                order: props.order,
                paragraph: values.paragraph
            })).then((res) => console.log(res))
            onEdit()
        },
    });
    return (
        <div className={css.partWrapper}>
            <div className={css.contact}>{formik.values.header}</div>
            <p>
                {formik.values.paragraph}
            </p>
            <span className={css.editWrapper}>
                <EditDeleteComponent editing={edit} onEdit={onEdit} onModal={() => {
                }} onDone={() => {
                }} noDel={true}/>
            </span>
            <ModalWrapper onModal={onEdit} visible={edit} width={"450"} height={"400"}
                          onClickAway={onEdit}>
                <form onSubmit={formik.handleSubmit} className={css.editModalWrapper}>
                    <Input name={'header'} onChange={formik.handleChange} type="text" value={formik.values.header}/>
                    <TextArea className={css.textArea} name={'paragraph'} onChange={formik.handleChange}
                              value={formik.values.paragraph}/>
                    <GreenBtn>Сохранить</GreenBtn>
                </form>
            </ModalWrapper>
        </div>
    )
}

export default AboutUs