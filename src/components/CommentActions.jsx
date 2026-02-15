import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useApp } from "../providers/AppProvider";

const api = "http://localhost:8800";

export default function CommentActions({comment, post}){
    const [showMenu, setShowMenu] = useState(false);
    const queryClient = useQueryClient();
    const {auth} = useApp();

    const deleteMutation = useMutation({
        mutationFn: async()=> {
            const token = localStorage.getItem('token');
            const res = await fetch(`${api}/comments/${comment.id}`,{
                method: 'DELETE',
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            if(!res.ok){
                throw new Error('Failed to delete comment');
            
            }
        },
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ['posts'] });

        }
    });

    if(!auth) {
        return null;
    }

    const isAuthorized = auth.id === comment.user.id || (post && auth.id === post.author.id) || auth.role === 'ADMIN';
    if(!isAuthorized){
        return null;
    }

    return(
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowMenu(!showMenu)}
                    className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z"
                    />

                </svg>
            </button>

            {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                    <div className="py-1">
                        <button onClick={()=> {
                            if(window.confirm('Are you sure you want to delete this comment?')){
                                deleteMutation.mutate();
                            }
                            setShowMenu(false)
                        }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Delete
                        </button>
                        <button 
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            Edit
                        </button>
                    </div>
                </div>
            )}
            {showMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={()=> setShowMenu(false)}
                >

                </div>
            )}
        </div>
    )
}
