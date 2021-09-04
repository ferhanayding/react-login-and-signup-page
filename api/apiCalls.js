import axios from "axios"
export const signup = (body) =>{
    return  axios.post('/api/1.0/users',body)
}
// creds username : dfesfs ve password : fdfee ı tutacak
export const login = creds =>{
    return axios.post('/api/1.0/auth',{},{auth : creds });     
} 

export const changeLanguage = language  => {

    axios.defaults.headers['accept-language'] = language;

}