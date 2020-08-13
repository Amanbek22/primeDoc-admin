import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import api from '../../api/Api'
import Preloader from "../preloader/Preloader";
import {HeaderWrapper} from "../mainStyledComponents/MainStyledComponents";
import css from './doctor.module.css'
import {useDispatch} from "react-redux";
import {setHeader} from "../../state/appReducer";


// const obj = {
//     ' ': [5],
//     d: [10],
//     e: [1],
//     H: [0],
//     l: [2, 3, 9],
//     o: [4, 7],
//     r: [8],
//     w: [6]
// }
//

















// const buildString = (obj: any) => {
//     const result:any = []
//     for (let i in obj) {
//         // console.log(obj[i])
//         obj[i].forEach((item:any) => {
//             console.log(item)
//             result[item] = i
//         })
//     }
//     console.log(result.join(''))
// }
// buildString(obj)

type DoctorProps = {}
const Doctor: React.FC<DoctorProps> = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setHeader('Подробно о враче'))
    }, [dispatch])
    const params: any = useParams()
    const [pending, setPending] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [image, setImage] = useState<string | null>(null)
    useEffect(() => {
        api.getDoctor(params.id)
            .then((res) => {
                setPending(false)
                setUser(res.data)
                setImage(res.data.image)
                console.log(res.data)
            })
        api.getDoc(params.id)
            .then((res) => {
                console.log(res.data)
            })
    }, [])

    if (pending) {
        return <Preloader/>
    }
    return (
        <div>
            <HeaderWrapper>
                <span className={css.logo}>
                    <img
                        // width={'100%'}
                        src={image ? "data:image/jpg;base64," + image : "https://image.freepik.com/free-photo/front-view-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg"}
                        alt={user?.firstName}/>
                </span>
                <div>
                    <div className={css.name}>
                        {user?.firstName + ' '}
                        {user?.lastName + ' '}
                        {user?.patronymic}
                    </div>
                    <p className={css.categories}>
                        {
                            user?.categories.map((item: any, index: number) => {
                                return <span
                                    key={item.id}>{item.name}{index === user.categories.length - 1 ? null : ', '}</span>
                            })
                        }
                    </p>
                    <p className={css.categories}>{
                        user?.username
                    }</p>
                    <p className={css.categories}>
                        Стаж 25 лет
                    </p>
                </div>
            </HeaderWrapper>
            <div>
                <div className={css.title}>О враче</div>
                <p className={css.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur
                    dignissimos enim, repellendus soluta voluptatem?</p>
            </div>
            <div>
                <div className={css.title}>Образование</div>
                <p className={css.text}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur
                    dignissimos enim, repellendus soluta voluptatem?</p>
            </div>
            <div>
                <div className={css.title}>Расписание</div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consectetur dignissimos enim,
                    repellendus soluta voluptatem?</p>
            </div>
        </div>
    );
};


export default Doctor;