import axios from "axios";

export const http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // TODO: change this to your api url
    headers: {
        "Content-Type": 'application/json',
        "authtoken": localStorage.getItem('token')
    }
})

export const getToken = () => {
    return localStorage.getItem('token')
}