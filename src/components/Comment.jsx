import { formatDistanceToNow } from "date-fns";
import CommentActions from "../components/CommentActions";
import { useApp } from "../providers/AppProvider";
import {useState} from "react";
import EditCommentForm from "./EditCommentForm.jsx";

export default function Comment({comment, post}){
    const {auth} = useApp();
    const [isEditing, setEditing] = useState(false);

    const createdAt = new Date(comment.createdAt);
    const updatedAt = comment.updatedAt ? new Date(comment.updatedAt) : null;

    const isEdited = updatedAt !== null &&
                        updatedAt.getTime() !== createdAt.getTime();

    return(
        <div className="w-full max-w-xl min-h-full flex flex-col justify-between p-8 bg-inherit rounded-lg shadow-xl dark:bg-inherit  border-b-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl cursor-pointer trasistion-all duration-300 m-auto">
            <div className="flex flex-col relative  mb-4">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-start gap-2 items-start  pb-3">
                        <p className="text-blue-950 dark:text-gray-200 text-sm font-semibold">{comment.user.name}</p>
                        <span className="text-gray-700 dark:text-gray-200 text-sm font-light">
                            {isEdited && updatedAt ?`(edited ${formatDistanceToNow(updatedAt,{
                                addSuffix: true,
                            })})`:
                                `${formatDistanceToNow(createdAt,{
                                    addSuffix: true,
                                })}`
                            }
                        </span>
                    </div>
                    <div>
                        {auth && (auth.id === comment.user.id || (post && auth.id === post.author.id)) ? (
                            <CommentActions comment={comment} post={post} onEdit={()=>setEditing(true)} />
                        ): null}
                    </div>
                </div>
                <div className=" p-4 mt-2">
                    {
                        isEditing ? (
                            <EditCommentForm comment={comment} postId={post.id} onDone={()=>setEditing(false)}/>
                        ) : (
                            <p className="text-gray-700 text-sm dark:text-gray-200 ">{comment.content}</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}