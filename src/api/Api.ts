import axios from "axios";


const http = axios.create({
    baseURL: "https://yourthomemaster.herokuapp.com"
});

export default {
    signIn: (data: any) => http.post("/api/token/", data),
}
