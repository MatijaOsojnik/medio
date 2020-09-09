import axios from 'axios'
let baseurl = ''
if(process.env.NODE_ENV === 'production'){
    baseurl = 'https://thinq-language-learning.herokuapp.com/api'
}else {
    baseurl = 'http://localhost:8082/api'
}

const axiosInstance = axios.create({
    baseURL: baseurl,
    timeout: 3000
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('thinq-jwt') || ''
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (err) => {
    return Promise.reject(err)
})

export default axiosInstance

// export default() => {
//     return axios.create({
//         baseURL: `http://localhost:8082/`
//     })
// }