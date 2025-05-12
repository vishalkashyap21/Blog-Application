



import { getEnv } from '@/helpers/getEnv';
import React from 'react';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import usericon from '@/assets/image/user.png';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useFetch } from '@/hooks/useFetch';

const CommentList = ({ props }) => {
    const user = useSelector(state => state.user);

    const { data, loading, error } = useFetch(`${getEnv('VITE_API_BASE_URL')}/comment/get/${props.blogid}`, {
        method: 'get',
        credentials: 'include',
    });

    if (loading) return <div>Loading...</div>;

    // Check if newComment is already in data.comments
    const isNewCommentIncluded = props.newComment && data?.comments?.some(c => c._id === props.newComment._id);

    return (
        <div>
            <h4 className='text-2xl font-bold'>
                <span className='me-2'>
                    {data && (data.comments.length + (props.newComment && !isNewCommentIncluded ? 1 : 0))}
                </span>
                Comments
            </h4>

            <div className='mt-5'>
                {props.newComment && !isNewCommentIncluded && (
                    <div className='flex gap-2 mb-3'>
                        <Avatar>
                            <AvatarImage src={user?.user.avatar || usericon} />
                        </Avatar>

                        <div>
                            <p className='font-bold'>{user?.user.name}</p>
                            <p>{moment(props.newComment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className='pt-3'>
                                {props.newComment?.comment}
                            </div>
                        </div>
                    </div>
                )}

                {data && data.comments.map(comment => (
                    <div key={comment._id} className='flex gap-2 mb-3'>
                        <Avatar>
                            <AvatarImage src={comment?.user?.avatar || usericon} />
                        </Avatar>

                        <div>
                            <p className='font-bold'>{comment?.user?.name}</p>
                            <p>{moment(comment?.createdAt).format('DD-MM-YYYY')}</p>
                            <div className='pt-3'>
                                {comment?.comment}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentList;
