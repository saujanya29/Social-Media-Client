import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigureSlice";

export const getUserProfile = createAsyncThunk("user/getUserProfile",async(body,thunkAPI)=>{

    try {
        // thunkAPI.dispatch(setLoading(true));
        const response = await axiosClient.post('/user/getUserProfile',body);
        console.log("User Profile",response);
        return response.result;
    } catch (error) {
        return Promise.reject(error)
    }
    // finally{
    //  thunkAPI.dispatch(setLoading(false))
    // }
})

export const likeAndUnlike = createAsyncThunk("post/likeAndUnlike",async(body,thunkAPI)=>{

  try {
      // thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post('/posts/like',body);
      console.log('like',response);
      return response.result.post;
  } catch (error) {
      return Promise.reject(error)
  }
  // finally{
  //  thunkAPI.dispatch(setLoading(false))
  // }
})




const postSlice = createSlice({
    name : "postSlice",
    initialState:{
       userProfile :{}
    },
    
    extraReducers: (builder) =>{
      builder.addCase(getUserProfile.fulfilled,(state,action)=>{
        state.userProfile = action.payload;
      }).addCase(likeAndUnlike.fulfilled,(state,action)=>{
        const post = action.payload;
        const index = state?.userProfile?.posts?.findIndex(item => item._id === post._id)
        if(index != undefined && index != -1){
          state.userProfile.posts[index] = post;
        }
      })
     
    }
})

export default postSlice.reducer;


