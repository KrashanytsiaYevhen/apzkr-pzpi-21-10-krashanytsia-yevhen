import {$authHost, $host} from "./index";
export const createOrder = async (UserId, OrderDate, items) =>{
    const {data} = await $host.post('api/order/create', {UserId, OrderDate, items})
    return data
}
export const allOrder = async (limit, page) =>{
    const {data} = await $authHost.get('api/order/all', {params: {
            limit, page
        }})
    return data
}

export const oneGuitar = async (id) =>{
    const {data} = await $host.get('api/order/' +  id)
    return data
}