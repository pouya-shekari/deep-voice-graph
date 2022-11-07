import http from '../services/http.service';

export async function getQuestion(config){
    try{
        const response = await http.getAll('/announcement/list',config)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}

export async function deleteQuestion(id,config){
    try{
        const response = await http.delete('/announcement/delete',id,config)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}

export async function addQuestion(data,config){
    try{
        const response = await http.post('/announcement/create',data,config)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}