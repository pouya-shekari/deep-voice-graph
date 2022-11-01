import http from '../services/http.service';

export async function loginUser(data){
    try{
        const response = await http.post('/user/login',data)
        return response
    }catch (e){
        return Promise.reject(e)
    }
}
