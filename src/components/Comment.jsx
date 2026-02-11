import { formatDistanceToNow } from "date-fns";

export default function Comment({comment}){
    return(
        <div className="w-full max-w-xl min-h-full flex flex-col justify-between p-8 bg-inherit  border-b-2 border-gray-200 hover:shadow-2xl cursor-pointer trasistion-all duration-300 m-auto">
            <div className="flex flex-col relative  mb-4">
                <div className="flex flex-row justify-start gap-2 items-start  pb-2">
                    <p className="text-blue-950 text-sm font-semibold">{comment.user.name}</p>
                    <p className="text-gray-700 text-sm font-light">{formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true})}</p>
                </div>
                <div className="absolute p-4">
                    <p>{comment.content}</p>
                </div>
            </div>
        </div>
    );
}