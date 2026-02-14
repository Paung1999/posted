import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useApp } from "../providers/AppProvider";

const api = "http://localhost:8800";


export default function AddPostForm(){
    const {auth} = useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const{
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    const onSubmit = async(data) => {
        try{
            const token = localStorage.getItem('token');
        if(!token){
            return;
        }
        const res = await fetch(`${api}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`
            },
            body: JSON.stringify({title: data.title, content: data.body})
            
        });
        if(!res.ok){
            return;

        }
        await res.json();
        reset();
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        navigate("/");

        }catch(err){
            console.log(err);
        }
    } 

    return(
        <div className="w-full max-w-xl flex flex-col gap-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 m-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Title</label>
                    <input type="text"
                        id="title"
                        {...register("title", {required: "Title is required"})}
                        placeholder="Enter post title..."
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400" 
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="content" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Content</label>
                    <textarea name="content" id="content"
                        {...register("body", {required: "Content is required"})}
                        placeholder="What's on your mind?"
                        rows="6"
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400 resize-none" 
                    ></textarea>
                    {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>}
                </div>

                <button type="submit"
                    className="w-full bg-blue-950 dark:bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-900 dark:hover:bg-blue-700 transform transition-all active:scale-[0.98] shadow-lg mt-2 cursor-pointer"
                >
                    Post
                </button>
            </form>
        </div>
    )
}