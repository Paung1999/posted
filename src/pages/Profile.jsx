import { useApp } from "../providers/AppProvider";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const api = "http://localhost:8800";

export default function Profile(){
    const {auth} = useApp();
    const navigate = useNavigate();
    const {data: activity , isLoading, isError} = useQuery({
        queryKey: ['activity', auth?.id],
        queryFn: async()=> {
            const endPoint = auth.role === 'ADMIN'? 
                `${api}/posts?authorId=${auth.id}`:
                `${api}/comments?userId=${auth.id}`;
                const res = await fetch(endPoint);
                return res.json();
        },
        enabled: !!auth?.id,
    });
    if(!auth){
        return (
            <div className="p-4 text-center">
                <h1>Please Login</h1>
            </div>
        )
    }
    return(
        <div className="max-w-4xl mx-auto py-8 px-4">
      {/* 1. Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="h-32 bg-linear-to-r from-blue-600 to-purple-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex justify-between items-end -mt-12 mb-4">
            <div className="flex items-end gap-4">
              {/* Avatar Placeholder */}
              <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-900 p-1">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-3xl font-bold text-gray-500">
                  {auth.name[0].toUpperCase()}
                </div>
              </div>
              
              <div className="mb-1">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  {auth.name}
                  {/* Role Badge */}
                  {auth.role === "ADMIN" && (
                    <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200">
                      Author
                    </span>
                  )}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">{auth.email}</p>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
              onClick={()=> navigate('/editProfile')}
            >
              Edit Profile
            </button>
          </div>

          {/* Bio Section */}
          <div className="mt-4 border-t border-gray-100 dark:border-gray-700 pt-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-2">About</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {auth.bio || "No bio yet. Click edit to tell us about yourself!"}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Activity Section (Role Based) */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {auth.role === "ADMIN" ? "My Articles" : "My Recent Comments"}
        </h2>

        {isLoading ? (
          <div className="text-gray-500">Loading activity...</div>
        ) : (
          <div className="space-y-4">
            {/* Logic to display empty state */}
            {(!activity || activity.length === 0) && (
              <p className="text-gray-500 italic">No activity found.</p>
            )}

            {activity && activity.map((item) => (
                <div key={item.id} className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    onClick={()=> navigate(`/PostDetail/${item.id}`)}
                >
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                        {auth.role === "ADMIN" ? item.title : item.content}
                    </p>
                    <span className="text-xs text-gray-500">
                        Posted on {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                </div>
            ))}
          </div>
        )}
      </div>
    </div>
    );
}