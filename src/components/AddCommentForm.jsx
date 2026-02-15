import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

const api = "http://localhost:8800";

export default function AddCommentForm({postId}){
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    const addComment = async (data) => {
        try{
            const token = localStorage.getItem('token');
            if(!token){
                return;
            }
            const res = await fetch(`${api}/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({content: data.content})

            });
            if(!res.ok){
                return;
            }
            await res.json()
            reset();
            queryClient.invalidateQueries({ queryKey: ['posts'] });

        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="w-full max-w-2xl mt-6 mb-2">
            <form onSubmit={handleSubmit(addComment)} className="relative">
                <div className="relative">
                    <textarea
                        id="content"
                        {...register("content", {required: "Content is required"})}
                        placeholder="What are your thoughts?"
                        rows="3"
                        className="w-full p-5 pr-32 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    ></textarea>
                    <div className="absolute bottom-3 right-3">
                        <button type="submit"
                            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 text-sm"
                        >
                            Comment
                        </button>
                    </div>
                </div>
                {errors.content && <p className="text-red-500 text-sm mt-2 ml-2">{errors.content.message}</p>}
            </form>
        </div>
    )
}