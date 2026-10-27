import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useApp } from "../providers/AppProvider";
import {faPenToSquare, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useDialog from "../hooks/useDialog.js";
import ConfirmDialog from "./ConfirmDialog.jsx";

const api = import.meta.env.VITE_API_URL;

export default function PostActions({post}){
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const {open, setOpen, handleClose} = useDialog();
    const {auth} = useApp();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`${api}/posts/${post.id}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`,
                },
                method: 'DELETE',
            });
            if(!res.ok){
                throw new Error('Failed to delete post');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            navigate('/');
        }
    });

    const isOwner = auth && auth.id === post.author.id;
    if(!isOwner){
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
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
                        <div className="py-1">
                            <button
                                onClick={()=>{
                                    navigate(`/edit/${post.id}`);
                                }}
                                className="flex  w-full items-center gap-2 text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                                Edit
                            </button>
                            <button onClick={()=> {
                                setOpen(!open);
                                setShowMenu(false)
                            }}
                                    className="flex w-full items-center gap-2 text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-200 hover:text-red-600 hover:bg-gray-300 dark:hover:bg-gray-700"
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                                Delete
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
                <ConfirmDialog title={'Delete this post'}
                               message={'Are you sure you want to delete this post?'}
                               open={open}
                               onClose={handleClose}
                               onConfirm={() => deleteMutation.mutate()}
                />
            </div>

    );

}