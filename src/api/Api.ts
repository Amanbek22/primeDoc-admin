import axios from "axios";


const http = axios.create({
    baseURL: "http://165.22.74.215:8080/api/v1/"
});

const getToken = () => {
    let data = JSON.parse(<string>localStorage.getItem('userData'))
    return data.access_token
}


export default {
    signIn: (data: any) => http.post("auth", data),
    refreshToken: () => http.post("auth"),
    getCategory: () => http.get(`category/`, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),
    setCategory: (data:any) => http.post(`category`,data, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),
    getUser: () => http.get(`user/`, {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),
    getFaq: () => http.get(`faq/`,{
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),
    createFaq: (data:{answer:string, question: string, order: number}) => http.post(`faq`,data , {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),
    deleteFaq: (id:number|string) => http.delete(`faq/${id}` , {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),
    getDoctor: () => http.get(`doctor/`,{
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    }),

}
