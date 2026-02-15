import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Comment from "../components/Comment";
import Loading from "../components/Loading";
import AddCommentForm from "../components/AddCommentForm";

const api = "http://localhost:8800";

export default function PostDetail() {
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await fetch(`${api}/posts/${id}`);
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl min-h-70 flex flex-col justify-between p-8 bg-gray-100 dark:bg-gray-800  rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-2xl cursor-pointer transistion-all duration-300 m-auto">
        <div>
          <h2 className="text-gray-900 dark:text-gray-200  font-bold text-2xl mb-6">
            {post.title}
          </h2>

          <div className="flex flex-row justify-start gap-2 items-start  pb-2">
            <div>
              <p className="text-gray-800 dark:text-gray-200 text-sm font-semibold">
                {post.author.name}
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-200 text-sm font-light">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-200 text-xl leading-relaxed ">
            {post.content}
          </p>
        </div>
      </div>

      <AddCommentForm postId={post.id}/>

      {post.comment.length > 0?(
        <div className="w-full max-w-2xl min-h-70 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl  flex flex-col items-center justify-center p-8 ">
        <div className="w-full max-w-2xl  bg-inherit rounded-lg flex items-start mb-2">
            <p className="text-blue-500 font-bold text-2xl p-4">Comments</p>
        </div>
        {post.comment && post.comment.map((comment)=> {
            return <Comment key={comment.id} comment={comment} post={post}/>
        })}
      </div>
      ): null}
    </div>
  );
}
