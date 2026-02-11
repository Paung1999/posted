import { useApp } from "../providers/AppProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faBars } from "@fortawesome/free-solid-svg-icons";


export default function Header(){
    const {mode, setMode, openDrawer, setOpenDrawer} = useApp();

    return(
        <header className="flex flex-row justify-between items-center p-4 bg-white shadow-md h-16 shrink-0 w-full ">
            <div className="flex flex-row items-center gap-4">
                <button onClick={() => setOpenDrawer(!openDrawer)} className="text-xl text-gray-600 hover:text-gray-800  transition-colors cursor-pointer">
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <h1 className="text-2xl font-bold text-blue-950 dark:text-blue-500">Posted</h1>
            </div>

            {mode === 'light'?
                <button onClick={() => setMode('dark')}
                        className="text-xl text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                >
                    <FontAwesomeIcon icon={faMoon} />

                </button>
                :
                <button onClick={() => setMode('light')}
                        className="text-xl text-yellow-500 hover:text-yellow-600 transition-colors cursor-pointer"
                >
                    <FontAwesomeIcon icon={faSun} />

                </button>
            }
        </header>
    )
}