import {$authHost, $host} from "./index";
export const createGuitar = async (Name, Brand, Description, Price, Stock, CategoryCategoryID) =>{
    const {data} = await $host.post('api/guitar/create', {Name, Brand, Description, Price, Stock, CategoryCategoryID})
    return data
}

export const createCategory = async (CategoryName) =>{
    const {data} = await $host.post('api/guitar/createcat', {CategoryName})
    return data
}

export const allGuitar = async (limit, page) =>{
    const {data} = await $host.get('api/guitar/all', {params: {
        limit, page
        }})
    return data
}

export const oneGuitar = async (id) =>{
    const { data } = await $host.get('api/guitar/' +  id, { include: 'category' });
    return data
}