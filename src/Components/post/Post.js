
import React from 'react'
import './Post.scss'
import Avatar from '../avatar/Avatar'
import postimg from '../../assests/naturePost.jpg'
import { CiHeart } from "react-icons/ci";
import { VscHeartFilled } from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { likeAndUnlike } from '../../Redux/Slices/postSlice';
import{useNavigate} from 'react-router'
import { showToast } from '../../Redux/Slices/appConfigureSlice';
import { TOAST_SUCCESS } from '../../App';



function Post({post}) {

const dispatch = useDispatch()
const navigate = useNavigate()

 async function handlePostLiked(){
     dispatch(showToast({
        type: TOAST_SUCCESS,
        message: "liked Or Unliked"
     }))
      dispatch(likeAndUnlike({
        postId: post._id
      }))
 }
  return (
    <div className='post'>
        <div className="heading"  onClick={() => navigate(`/profile/${post?.owner._id}`)}>
            <Avatar src={post.owner?.avatar?.url}  />
            <h4>{post?.owner?.name}</h4>
        </div>
        <div className="content">
            <img src={post?.image?.url} alt="" />
        </div>
        <div className="footer">
            <div className="like" onClick={handlePostLiked}>
            {post?.isLiked ? <VscHeartFilled color='red' className='icon' />: < CiHeart className='icon'/> }
            <h4>{`${post?.likesCount} likes`}</h4>
            </div>
            <p className='caption'>{post?.caption}</p>
            <h6 className='time-ago'>{post?.timeAgo}</h6>
        </div>
    </div>
  )
}

export default Post