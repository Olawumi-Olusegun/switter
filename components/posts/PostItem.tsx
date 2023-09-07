import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react'
import useLoginModal from '@/hooks/useLoginModal';
import useCurrentUser from '@/hooks/useCurrentUser';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../Avatar';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from 'react-icons/ai';
import useLike from '@/hooks/useLike';

interface PostItemProps  {
    userId?: string;
    post: Record<string, any>
}

const PostItem: React.FC<PostItemProps> = ({ userId, post }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();
    const { hasLiked, toggleLike } = useLike({postId: post?.id, userId: userId });

    const gotoUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${post?.user?.id}`);
    }, [router, post?.user?.id]);

    const gotoPost = useCallback(() => {
        router.push(`/posts/${post?.id}`);
    }, [router, post?.id]);

    const handleLike = useCallback((event: any) => {
        event.stopPropagation();
        
        if(!currentUser) {
           return loginModal.onOpen();
        }

        toggleLike();

    }, [loginModal, currentUser, toggleLike]);

    const createdAt  = useMemo(() => {
        if(!post?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(post?.createdAt))
    }, [post?.createdAt]);

    const LikedIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

    console.log({hasLiked})

  return (
    <div onClick={gotoPost} className='border-b[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition'>
        <div className="flex flex-row items-start gap-3">
            <Avatar userId={post?.user?.id} />
            <div className="">
                <div className="flex flex-row items-center gap-2">
                    <p onClick={gotoUser} className='text-white font-semibold cursor-pointer hover:underline'>{post?.user?.name}</p>
                    <span onClick={gotoUser} className='text-neutral-500 cursor-pointer hover:underline hidden md:block'>@{post?.user?.username}</span>
                    <span className="text-neutral-500 text-sm ">{createdAt}</span>
                </div>
                <div className='text-white mt-1'>
                    { post?.body }
                </div>
                <div className='flex flex-row items-center mt-3 gap-10'>
                    <div className="flex flex-row items-center text-neutral-500 cursor-pointer gap-2 tansition hover:text-sky-500">
                        <AiOutlineMessage size={20} />
                        <p>{post?.comments?.length || 0}</p>
                    </div>

                    <div onClick={handleLike} className="flex flex-row items-center text-neutral-500 cursor-pointer gap-2 tansition hover:text-red-500">
                        <LikedIcon size={20} color={hasLiked ? "red" : ""} />
                        <p>{post?.likedIds?.length || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostItem