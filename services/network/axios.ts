import axios from 'axios'
import { _TOKEN } from '../profile';
import { checkAxiosError, checkAxiosResponse } from './natification';


export const axiosInstance = axios.create({
    baseURL: 'http://185.211.170.253:8008/api/wms/v1',
    timeout: 20000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config: any) => {
        const token = _TOKEN.value;
        if (config.url.includes('/login')) {
            return config
        }

        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        //     router.push('/login')
        // }     

        // config.headers.merchant = _merchantStore.value.id

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {        
        checkAxiosResponse(response)       
        return response.data;
    },
    (error) => {
        checkAxiosError(error)
        // checkAxiosResponse(error.response)

        if (error?.response?.status === 403) {

        }
        if (error?.response?.status === 401) {
            // LOGOUT()             
        }


        return Promise.reject(error);
    }
);