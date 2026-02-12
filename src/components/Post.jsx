import { useNavigate } from "react-router";
import { formatDistanceToNow } from "date-fns";


export default function Post({post}){
    const navigate = useNavigate();
    
    return(
        <div className="w-full max-w-2xl min-h-70 flex flex-col justify-between p-8 bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-700 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl cursor-pointer trasistion-all duration-300 m-auto" onClick={()=> navigate(`/PostDetail/${post.id}`)}>
            <div >
                <h2 className="text-blue-950 dark:text-gray-200 font-bold text-2xl mb-6">{post.title}</h2>

                <div className="flex flex-row justify-start gap-2 items-start  pb-2">
                    <div>
                        <p className="text-blue-950 dark:text-gray-200 text-sm font-semibold">{post.author.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 dark:text-gray-200 text-sm font-light">{formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}</p>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-200 text-xl leading-relaxed line-clamp-3">
                {post.content}
                </p>
            </div>
        </div>
    )
}