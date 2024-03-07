import React, { useEffect } from 'react'
import './Feed.scss'
import Post from '../post/Post'
import Follower from '../followers/Follower'
import CreatePost from '../CreatePost/CreatePost'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedData } from '../../Redux/Slices/feedSlice'

function Feed() {


  const dispatch = useDispatch();
  const feedData = useSelector(state => state.feedDataReducer.feedData)
 

  useEffect(()=>{
        dispatch(getFeedData())
  },[dispatch])


  return (
    <div className='feed'>
      <div className="container">
        <div className="left-part">
        {feedData?.posts?.map(post => <Post key={post._id} post = {post}/>)}
        </div>
        <div className="right-part">
          <div className="followings">
           <h3 className='title'>You are following</h3>
           {feedData?.following?.map(user => <Follower key={user._id} user ={user}/>)}
          </div>
          <div className="suggestions">
           <h3 className='title'>Suggessted for you</h3>
           {feedData?.suggestions?.map(user => <Follower key={user._id} user={user}/>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feed