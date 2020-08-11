import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api/Api'

const PaymentDetail = () => {
    const params:any = useParams()
    const [data, setData] = useState()
    useEffect(()=>{
        api.getPayments(params.id)
            .then((res)=>{
                console.log(res.data)
                setData(res.data)
            })
    }, [params.id])
    return (
        <div>
            Payment
        </div>
    )
}


export default PaymentDetail