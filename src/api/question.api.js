import http from '../services/http.service';

export async function getQuestion(config){
    try{
        const response = await http.getAll('/announcement/list',config)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}
