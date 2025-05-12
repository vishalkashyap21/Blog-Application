


import React, { useEffect, useState } from 'react'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { getEnv } from '@/helpers/getEnv';
import { useFetch } from '@/hooks/useFetch';
import { showToast } from '@/helpers/showToast';


const LikeCount = ({ blogid }) => {
    const [likeCount, setLikeCount] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)
    const user = useSelector(state => state.user)

    const likeUrl = `${getEnv('VITE_API_BASE_URL')}/blog-like/get-like/${blogid}${user?.isLoggedIn ? `?userid=${user.user._id}` : ''}`

    const { data: blogLikeCount } = useFetch(likeUrl, {
        method: 'get',
        credentials: 'include',
    });

    useEffect(() => {
        if (blogLikeCount) {
            setLikeCount(blogLikeCount.likecount)
            setHasLiked(blogLikeCount.isUserliked)
        }
    }, [blogLikeCount]);

    const handleLike = async () => {
        if (!user?.isLoggedIn) {
            return showToast('error', 'Please login into your account.');
        }

        const res = await fetch(`${getEnv('VITE_API_BASE_URL')}/blog-like/do-like`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: user.user._id, blogid })
        });

        if (!res.ok) return showToast('error', res.statusText);
        const data = await res.json();
        setLikeCount(data.likecount)
        setHasLiked(!hasLiked)
    }

    return (
        <button onClick={handleLike} type='button' className='flex justify-between items-center gap-1'>
            {hasLiked ? <FaHeart fill='red' className='text-2xl' /> : <FaRegHeart  className='text-2xl' />}
            {likeCount}
        </button>
    )
}


export default LikeCount;
