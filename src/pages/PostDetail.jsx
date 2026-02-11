import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import Comment from "../components/Comment";

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
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl min-h-70 flex flex-col justify-between p-8 bg-gray-100 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl cursor-pointer trasistion-all duration-300 m-auto">
        <div>
          <h2 className="text-blue-950 font-bold text-2xl mb-6">
            {post.title}
          </h2>

          <div className="flex flex-row justify-start gap-2 items-start  pb-2">
            <div>
              <p className="text-gray-800 text-sm font-semibold">
                {post.author.name}
              </p>
            </div>
            <div>
              <p className="text-gray-700 text-sm font-light">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <p className="text-gray-700 text-xl leading-relaxed ">
            {post.content}
          </p>
        </div>
      </div>

      <div className="w-full max-w-2xl min-h-70 bg-gray-50 rounded-2xl shadow-xl  flex flex-col items-center justify-center p-8 ">
        <div className="w-full max-w-2xl  bg-inherit rounded-lg flex items-start mb-2">
            <p className="text-blue-500 font-bold text-2xl p-4">Comments</p>
        </div>
        {post.comment && post.comment.map((comment)=> {
            return <Comment key={comment.id} comment={comment}/>
        })}
      </div>
    </div>
  );
}
