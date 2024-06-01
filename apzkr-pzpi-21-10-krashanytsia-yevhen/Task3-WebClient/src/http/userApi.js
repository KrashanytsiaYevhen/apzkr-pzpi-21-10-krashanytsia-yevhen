import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";
export const registration = async (user_name, user_login, user_password, user_phone, user_mail, role) =>{
    const {data} = await $host.post('api/user/registration', {user_name, user_login, user_password, user_phone, user_mail, role})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}

export const login = async (user_login, user_password) =>{
    const {data} = await $host.post('api/user/login', {user_login, user_password})
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    try {
        const { data } = await $authHost.get('api/user/auth');
        localStorage.setItem('token', data.token);
        return jwtDecode(data.token);
    } catch (error) {
        console.error("Помилка авторизації:", error);
        throw error;
    }
};