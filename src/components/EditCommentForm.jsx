import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const api = import.meta.env.VITE_API_URL;

const getDefaultValues = (comment) => ({
    content: comment.content
});

export default function EditCommentForm({comment, postId, onDone}){
    const queryClient = useQueryClient();
    const{
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({defaultValues: getDefaultValues(comment)});

    const updateComment = async (data) => {
        const token = localStorage.getItem('token');
        if(!token)throw new Error("You need to log in");
        const res = await fetch(`${api}/comments/${comment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({content: data.content}),
        })
        if (!res.ok) throw new Error("Failed to update post");
        return res.json();
    }

    const mutation = useMutation({
        mutationFn: updateComment,
        onSuccess: () => {
            console.log("postId:", postId);
            queryClient.invalidateQueries({ queryKey: ["post", String(postId)] });
            onDone();
        },
    });

    const onSubmit = (data) => {
        mutation.mutate({id: comment.id , content: data.content})
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'relative'}>
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
                        {mutation.isPending ? 'Saving..' : 'Save'}
                    </button>
                </div>
            </div>
            {errors.content && (<p className="text-red-500 text-sm mt-1">{errors.title.message}</p>)}
        </form>
    )
}