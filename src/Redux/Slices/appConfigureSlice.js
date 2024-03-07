import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient";

export const getMyInfo = createAsyncThunk("user/getMyInfo",async(body,thunkAPI)=>{

    try {
        // thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.get('/user/getMyInfo');
        console.log("get My Info",response);
        return response.result;
    } catch (error) {
        return Promise.reject(error)
    }
    // finally{
    //  thunkAPI.dispatch((false))
    // }
})


export const updateMyProfile = createAsyncThunk('user/updateMyProfile',async(body,thunkAPI) =>{

    try {
        // thunkAPI.dispatch(setLoading(true));  // we have handled this loading and unloading globaly in the axios client
        const response = await axiosClient.put('/user/',body);
        console.log("Updated Profile",response);
        return response.result;
    } catch (error) {
        return Promise.reject(error)
        
    }
    // finally{
    //  thunkAPI.dispatch(setLoading(false))
    // }
})


const appConfigSlice = createSlice({
    name : "appConfigSlice",
    initialState:{
        isLoading : false,
        toastData:{},
        myProfile : {}
    },
    reducers: {
        setLoading :(state,action) =>{
         state.isLoading = action.payload;
        },
        showToast :(state,action)=>{
            state.toastData = action.payload
        }
    },
    extraReducers: (builder) =>{
      builder.addCase(getMyInfo.fulfilled,(state,action)=>{
        state.myProfile = action.payload.user;
      })
      .addCase(updateMyProfile.fulfilled,(state,action)=>{
        state.myProfile = action.payload.user;
      })
    }
})

export default appConfigSlice.reducer;

export const {setLoading,showToast} = appConfigSlice.actions
