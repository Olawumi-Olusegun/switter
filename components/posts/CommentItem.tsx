import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router';
import { formatDistanceToNowStrict } from 'date-fns';
import Avatar from '../Avatar';


interface CommentItemProps {
    comment: Record<string, any>
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const router = useRouter();
    const gotoUser = useCallback((event: any) => {
        event.stopPropagation();

        router.push(`/users/${comment?.user?.id}`);

    }, [router, comment?.user?.id]);

    const createdAt = useMemo(() => {
        if(!comment?.createdAt) {
            return null;
        }
        return formatDistanceToNowStrict(new Date(comment?.createdAt));
    }, [comment?.createdAt]);

  return (
    <div className='border-b-[1px] border-neutral-800 cursor-pointer hover:bg-neutral-900 transition'>
        <div className="flex flex-row items-start gap-3">
            <Avatar userId={comment?.user?.id} />
            <div>
                <div className="flex flex-row items-center gap-2">
                    <p onClick={gotoUser} className='text-white font-semibold cursor-pointer hover:underline'>
                        {comment?.user?.name}
                    </p>
                    <span className='text-neutral-800 cursor-pointer hover:underline hidden md:block'>
                        @{comment?.user?.name}
                    </span>
                    <span className="text-neutral-500 text-sm">
                        {createdAt}
                    </span>
                </div>
                <div className="text-white mt-1">
                    {comment?.body}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CommentItem