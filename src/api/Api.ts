import axios from "axios";


const http = axios.create({
    baseURL: "http://165.22.74.215:8080/api/v1/"
});

const getToken = () => {
    let data = JSON.parse(localStorage.getItem('userData') as string)
    return data.access_token
}

let Authorization = () => ({
    "Authorization": "Bearer " + getToken()
})
const config = () => ({
    headers: Authorization()
})
export default {
    signIn: (data: any) => http.post("auth", data),
    refreshToken: (data: any) => http.post("refresh", data),
    getIllness: (id?: string) => http.get(`illness/${id ? id : ''}`, config()),
    getAboutUs: () => http.get(`about/`, config()),
    setAboutUs: (id: number, data: any) => http.put(`about/${id}`, data, config()),
    docsUpload: (data: any) => http.post(`docs/upload/`, data, config()),
    getDocs: () => http.get(`docs/`, config()),
    getCategory: (id?: string) => http.get(`category/${id ? 'info/details/' + id : ''}`, config()),
    delCategory: (id: number | string) => http.delete(`category/${id}`, config()),
    setCategory: (data: any) => http.post(`category`, data, config()),
    putCategory: (id: number | string, data: any) => http.put(`category/${id}`, data, config()),
    putCategoryImage: (id: number | string, data: any) => http.put(`category/image/${id}`, data, config()),
    getUser: () => http.get(`user/`, config()),
    getClient: (page: number = 1, size: number) => http.get(`client/card?page=${page}&size=${size}`, config()),
    getFaq: () => http.get(`faq/`, config()),
    createFaq: (data: { answer: string, question: string, order: number }) => http.post(`faq`, data, config()),
    putFaq: (data: { answer: string, question: string, order: number }, id: number) => http.put(`faq/${id}`, data, config()),
    orderFaq: (data: any) => http.put(`faq/order/`, data, config()),
    deleteFaq: (id: number | string) => http.delete(`faq/${id}`, config()),
    getDoctor: (id?: number) => http.get(`doctor/data/${id ? id : ''}`, config()),
    getDoc: (id?: number) => http.get(`doctor/full/${id ? id : ''}`, config()),
    delDoctor: (id: number) => http.delete(`doctor/${id}`, config()),
    setDoctor: (data: any) => http.post(`doctor`, data, config()),
    editDoctor: (id: number, data: any) => http.put(`doctor/${id}`, data, config()),
    getSchedule: (id: number) => http.get(`schedule/doctor/${id ? id : ''}`, config()),
    createSchedule: (data: any) => http.post(`schedule`, data, config()),
    deleteSchedule: (id: number) => http.delete(`schedule/${id}`, config()),
    changeSchedule: (id: number, data: any) => http.put(`schedule/${id}`, data, config()),
    getPayments: (id?: number) => http.get(`payment/${id ? id : ''}`, config()),
    delPayments: (id: number) => http.delete(`payment/${id}`, config()),
    createPayment: (data: any) => http.post(`payment`, data, config()),
    putPaymentSteps: (id: number, data: any) => http.put(`payment/${id}`, data, config()),
    putPaymentImage: (id: number, data: any) => http.put(`payment/image/${id}`, data, config()),
    getReservation: (page: number = 0) => http.get(`reservation/info?page=${page}`, config()),
    delReservation: (id: number) => http.delete(`reservation/${id}`, config()),
    approve: (id: number) => http.put(`reservation/approve/${id}`, {
        paid: true
    }, config())
}
