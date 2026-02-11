import { useContext, useState, createContext, useEffect } from "react";

const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

export default function AppProvider({children}){
  
    const [mode , setMode] = useState( 'light');
    const [openDrawer , setOpenDrawer] = useState(false);
    const [auth, setAuth] = useState();

    useEffect(()=> {
        const api = "http://localhost:8800";
        const token = localStorage.getItem('token');
        if(token){
            fetch(`${api}/users/verify`, {
                method: 'GET',
                headers:{
                    Authorization: `Beare ${token}`
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