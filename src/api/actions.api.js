import http from '../services/http.service';

export async function getActions(config){
    try{
        const response = await http.getAll('/action/list',config)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}

export async function deleteAction(config){
    try{
        const response = await http.delete('/action/delete',config)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}

export async function addAction(data,config){
    try{
        const response = await http.post('/action/create',data,config)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}

export async function editAction(data,config){
    try{
        const response = await http.put('/action/update',data,config)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}