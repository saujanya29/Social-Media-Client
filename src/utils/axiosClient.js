import axios from "axios";
import { KEY_ACCESS_TOKEN, getItem, removeItem, setItem } from "./localStorageManager";
import store, { Store } from "../Redux/store";
import { setLoading, showToast } from "../Redux/Slices/appConfigureSlice";
import { TOAST_FAILURE } from "../App";


export const axiosClient = axios.create({
    baseURL : process.env.REACT_APP_SERVER_BASE_URL, //"http://localhost:4000",
    withCredentials: true
})

axiosClient.interceptors.request.use(
    (request) =>{
        // console.log(request);
        const accessToken = getItem(KEY_ACCESS_TOKEN);
        // console.log(accessToken);
        request.headers["Authorization"] = `Bearer ${accessToken}`;
        store.dispatch(setLoading(true))
         return request;
    } 
)

axiosClient.interceptors.response.use(
   async (response) =>{
    store.dispatch(setLoading(false))
    //   console.log(response);
        const data = response.data;
        // console.log(data);
        if(data.status === "ok"){
            return data;
        }
        const originalRequest = response.config;
        const statusCode = data.statusCode;
        const error = data.message;

    //    dispatch can not be made from the non-component so import store and then disptach
    //    this will handle the error recieved from the response
    store.dispatch(showToast({
        type: TOAST_FAILURE,
        message:error
    }))

    // if(statusCode === 401 && originalRequest.url === `${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`)//"http://localhost:4000/auth/refresh" )
    //     {  
    //         removeItem(KEY_ACCESS_TOKEN);
    //         window.location.replace('/login','_self');
    //         console.log(Promise.reject(error));
    //         return Promise.reject(error)
    //     }





        if(statusCode === 401 && !originalRequest._retry){ // means access token expires so use refresh token to regenerate it

            originalRequest._retry = true;
            // call the refresh api and it will regenerate the access token after verifying the correct refresh token
            const response = await axios
            .create({
                withCredentials: true,
            })
            .get(`${process.env.REACT_APP_SERVER_BASE_URL}/auth/refresh`);

            console.log("response from backend" , response);

            if(response.data.status ==="ok"){
                setItem(KEY_ACCESS_TOKEN,response.data.result.accessToken);
                originalRequest.headers["Authorization"] = `Bearer ${response.data.result.accessToken}`;
                return axios(originalRequest)
            }
            else{
                // when refresh token expires , send user to login page
                removeItem(KEY_ACCESS_TOKEN);
                window.location.replace('/login','_self');
                return Promise.reject(error)
            }

        }

        return Promise.reject(error)
    },
    async(error) => {
        store.dispatch(setLoading(false));
        store.dispatch(showToast({
            type: TOAST_FAILURE,
            message: error.message
        }))
        return Promise.reject(error);
    });

