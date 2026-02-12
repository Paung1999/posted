import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCircleUser,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../providers/AppProvider";
export default function AppDrawer() {
  const navigate = useNavigate();
  const { openDrawer, setAuth, auth} = useApp();

  if (!openDrawer) {
    return null;
  }

  return (
    <div className="flex flex-col justify-start items-center bg-gray-200 dark:bg-gray-800 shadow-lg h-full w-64 gap-4 pt-4 shrink-0 ">
      <button
        onClick={() => navigate("/")}
        className="flex flex-row justify-center items-center gap-2 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 transition-all duration-300 ease-in-out w-5/6 rounded-lg cursor-pointer"
      >
        <FontAwesomeIcon icon={faHome} />
        <h3 className="font-semibold font-sans ">Home</h3>
      </button>
      {auth ? (
        <>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-row justify-center items-center gap-2 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 transition-all duration-300 ease-in-out w-5/6 rounded-lg cursor-pointer"
          >
            <FontAwesomeIcon icon={faCircleUser} />
            <h3 className="font-semibold font-sans ">Profile</h3>
          </button>
          <button
            onClick={() => {
                setAuth(false)
                localStorage.removeItem('token');
            }}
            className="flex flex-row justify-center items-center gap-2 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 transition-all duration-300 ease-in-out w-5/6 rounded-lg cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <h3 className="font-semibold font-sans ">Log out</h3>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => navigate("/login")}
            className="flex flex-row justify-center items-center gap-2 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 transition-all duration-300 ease-in-out w-5/6 rounded-lg cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <h3 className="font-semibold font-sans ">Login</h3>
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex flex-row justify-center items-center gap-2 py-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 transition-all duration-300 ease-in-out w-5/6 rounded-lg cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <h3 className="font-semibold font-sans ">Register</h3>
          </button>
        </>
      )}
    </div>
  );
}
