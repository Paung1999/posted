import EditPostForm from "../components/EditPostForm.jsx";
import {Link, useParams} from "react-router";
import {useApp} from "../providers/AppProvider.jsx";
import {useQuery} from "@tanstack/react-query";
import Loading from "../components/Loading.jsx";

const api = import.meta.env.VITE_API_URL;

export default function EditPostPage(){
    const {id } = useParams();
    const {auth} = useApp();

    const {data:post, isLoading, isError} = useQuery({
        queryKey: ['posts', id],
        queryFn: async () => {
            const res = await fetch(`${api}/posts/${id}`);
            if (!res.ok) throw new Error("Failed to fetch post");
            return res.json();
        }
    });
    if(isError){
        return <h1>Error...</h1>
    }

    if(isLoading){
        return <Loading />;
    }

    if(auth?.id !== post.author.id) return <h1>You cannot edit this page</h1>

    return (
        <div className={'w-full flex flex-col gap-4 max-w-xl mx-auto'}>
            <div className="w-full max-w-2xl">
                <Link
                    to={`/postDetails/${id}`}
                    className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline dark:text-blue-400"
                >
                    ← Back to posts
                </Link>
            </div>
            <EditPostForm post={post} />
        </div>
    )
}