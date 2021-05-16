import axios from 'axios'
import { parse } from 'ipaddr.js'

const API_URL = 'http://localhost:3001/api/'

const register = (username, password) => {
    return axios.post(API_URL + "signup", {
        username,
        password,
    })
}

const login = (username, password) => {
    return axios.post(API_URL+"signin", {
        username,
        password,
    })
        .then( response => {
            if (response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response.data
        })
}

const logout = () => {
    localStorage.removeItem("user")
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
}

export default {
    register, login, logout, getCurrentUser
}

