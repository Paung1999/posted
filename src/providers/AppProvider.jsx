import { useContext, useState, createContext, useEffect , } from "react";

const api = import.meta.env.VITE_API_URL;

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}


export default function AppProvider({children}){
  
    const [mode , setMode] = useState( '');
    const [openDrawer , setOpenDrawer] = useState(false);
    const [auth, setAuth] = useState();

    useEffect(()=> {
        const token = localStorage.getItem('token');
        if(token){
            fetch(`${api}/users/verify`, {
                method: 'GET',
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then( async res => {
                const user = await res.json();
                if(res.ok) {
                    setAuth(user);
                }else{
                    localStorage.removeItem('token');
                }
            })
        }

    },[]);


    useEffect(() => {
        const root = window.document.documentElement;

        if(mode === 'light'){
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }else{
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }, [mode]);


    return(
        <AppContext.Provider value={{mode, setMode, openDrawer, setOpenDrawer, auth, setAuth}}>
            {children}
        </AppContext.Provider>
    )
}