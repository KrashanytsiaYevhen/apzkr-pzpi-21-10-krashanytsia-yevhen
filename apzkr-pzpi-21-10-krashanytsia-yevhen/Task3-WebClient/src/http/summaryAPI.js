import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";
export const createSummary = async (summary_name, phone, city, speciality, summary_text,userId) =>{
    const {data} = await $host.post('api/summary/createsummary', {summary_name, phone, city, speciality, summary_text,userId})
    return data
}

export const getSummary = async (summary_name, speciality, limit, page) =>{
    const {data} = await $host.get('api/summary/allsummary', {params: {
            summary_name, speciality, page, limit
        }})
    return data
}

export const searchSummary = async (query, limit, page) =>{
    const {data} = await $host.get('api/summary/searchsummary', {params: {
            query, limit, page
        }})
    return data
}

export const oneSummary = async (id) =>{
    const {data} = await $host.get('api/summary/' +  id)
    return data
}

export const deleteSummary = async () =>{
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token',data.token)
    return jwtDecode(data.token)
}
export const SaveSummary = async (userId, summaryId) =>{
    const {data} = await $host.post('api/savesummary/favsummary', {
            userId, summaryId
        })
    return data
}
export const getSaveSummaryId = async (limit, page, userId) =>{
    const {data} = await $host.get('api/savesummary/allfavsum',{params: {
            limit, page, userId
    }})
    return data
}

export const aprove = async (id) =>{
    const {data} = await $host.post('api/savesummary/aprove/' + id,{params: {
            id
        }})
    return data
}

export const denied = async (id) =>{
    const {data} = await $host.delete('api/savesummary/denied/' + id,{params: {
            id
        }})
    return data
}