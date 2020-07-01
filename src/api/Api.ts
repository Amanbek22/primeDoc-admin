import axios from "axios";


const http = axios.create({
    baseURL: "http://165.22.74.215:8080/api"
});

export default {
    signIn: (data: any) => http.post("/api/token/", data),
}
