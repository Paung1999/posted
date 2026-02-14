import { useNavigate } from "react-router";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center p-4">
            <h1 className="text-8xl font-bold text-gray-300 dark:text-gray-700">404</h1>
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-blue-950 dark:text-gray-200">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400">The page you are looking for doesn't exist or has been moved.</p>
            </div>
            <button 
                onClick={() => navigate("/")} 
                className="px-6 py-2 bg-blue-950 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-900 dark:hover:bg-blue-700 transition-colors cursor-pointer"
            >
                Go Back Home
            </button>
        </div>
    )
}
