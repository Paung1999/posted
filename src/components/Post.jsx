import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";

import PostActions from "../components/PostActions";

export default function Post({post}){
    const navigate = useNavigate();

    const createdAt = new Date(post.createdAt);
    const updatedAt = post.updatedAt
        ? new Date(post.updatedAt)
        : null;

    const isEdited =
        updatedAt !== null &&
        updatedAt.getTime() !== createdAt.getTime();


    return(
        <div className="w-full max-w-2xl min-h-70 flex flex-col justify-between p-8 bg-gray-100 dark:bg-gray-700
        dark:text-white dark:border-gray-700 rounded-lg shadow-xl border border-gray-200 hover:shadow-2xl
        cursor-pointer transition-all duration-300 m-auto" onClick={()=> navigate(`/postDetails/${post.id}`)}>
            <div >
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-blue-950 dark:text-gray-200 font-bold text-2xl mb-6">{post.title}</h2>
                    <PostActions post={post}/>
                </div>

                <div className="flex flex-row justify-start gap-2 items-center  pb-2">
                    <div>
                        <p className="text-blue-950 dark:text-gray-200 text-sm font-semibold">{post.author.name}</p>
                    </div>
                    <div>
                        <span className="text-gray-700 dark:text-gray-200 text-sm font-light">
                            {isEdited && updatedAt
                                ? `(edited ${formatDistanceToNow(updatedAt, {
                                    addSuffix: true,
                                })})`
                                : formatDistanceToNow(createdAt, {
                                    addSuffix: true,
                                })}
                        </span>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-200 text-xl leading-relaxed line-clamp-3">
                {post.content}
                </p>
            </div>
        </div>
    )
}