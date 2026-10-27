import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router";

const api = import.meta.env.VITE_API_URL;

const getDefaultValues = (post) => ({
    title: post.title,
        content: post.content,
})

export default function EditPostForm({post}){
    const {register,
        handleSubmit,
        formState: {errors}
    } = useForm({defaultValues:getDefaultValues(post)});
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (data) => {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("You need to log in");

            const res = await fetch(`${api}/posts/${post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title: data.title, content: data.content }),
            });
            if (!res.ok) throw new Error("Failed to update post");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            navigate(`/postDetails/${post.id}`);
        },
    });



    return(
        <form onSubmit={handleSubmit((data)=>mutation.mutate(data))} className={'flex flex-col gap-6'} >
            <div className={'flex flex-col w-full max-w-xl mx-auto gap-2'}>
                <label htmlFor="title"
                    className={'text-slate-800 dark:text-slate-300 font-bold '}
                >
                    Title
                </label>
                <input id='title' type="text" {...register('title', {required: 'title is required'})}
                    className={'border rounded-sm py-2 px-2 text-slate-800 dark:text-slate-300'}
                />
            </div>
            {errors.title && (<p className="text-red-500 text-sm mt-1">{errors.title.message}</p>)}
            <div className={'flex flex-col w-full max-w-xl mx-auto gap-2'}>
                <label htmlFor="content"
                       className={'text-slate-800 dark:text-slate-300 font-bold '}
                >Content</label>
                <textarea id='content'  rows="10"
                          {...register('content', {required: 'Content is required'})}
                          className={'border rounded-sm py-2 px-2 text-slate-800 dark:text-slate-300'}
                />
            </div>
            {errors.body && (<p className="text-red-500 text-sm mt-1">{errors.body.message}</p>)}

            {mutation.isError && (
                <p className="text-red-500 text-sm">{mutation.error.message}</p>
            )}

            <button type="submit"
                    className="w-full bg-blue-950 dark:bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-900 dark:hover:bg-blue-700 transform transition-all active:scale-[0.98] shadow-lg mt-2 cursor-pointer"
            >
                {mutation.isPending ? 'Saving...' : 'Save'}
            </button>

        </form>
    )
}