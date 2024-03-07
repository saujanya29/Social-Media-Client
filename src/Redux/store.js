import {configureStore} from '@reduxjs/toolkit';
import appConfigReducer from './Slices/appConfigureSlice';
import postsReducer from './Slices/postSlice';
import feedDataReducer from './Slices/feedSlice';

export default configureStore({
    reducer :{
         appConfigReducer,
         postsReducer,
         feedDataReducer

    }
})