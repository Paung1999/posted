import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useApp } from "../providers/AppProvider"

const api = "http://localhost:8800";

export default function EditProfile(){
    const { auth, setAuth } = useApp();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            bio: auth?.bio || ""
        }
    });


    const onSubmit = async (data) => {
        const token = localStorage.getItem('token');
        if(!token){
            return;
        }
        try{
            const res = await fetch(`${api}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            if(!res.ok){
                return;
            }
            const updatedUser = await res.json();
            // Update the local auth state with the new data from the server
            setAuth({ ...auth, ...updatedUser });
            reset();
            navigate('/profile');

        }catch(err){
            console.log(err);
        }
    }
    return(
        <div className="w-full max-w-xl flex flex-col gap-6 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 m-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label htmlFor="bio" className="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Bio</label>
                    <input 
                        type="text" 
                        id="bio"
                        {...register("bio", { required: "Bio is required"} )} 
                        placeholder="Enter your bio" 
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all placeholder-gray-400"
                    />
                    {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>}
                    <button type="submit" className="w-full bg-blue-950 dark:bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-900 dark:hover:bg-blue-700 transform transition-all active:scale-[0.98] shadow-lg mt-2 cursor-pointer">Save</button>
                </div>
            </form>

        </div>
    )
}