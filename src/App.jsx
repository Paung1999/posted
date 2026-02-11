import { Outlet } from 'react-router';
import AppDrawer from './components/AppDrawer';
import Header from './components/Header';


export default function App(){
  return(
    <div className="flex flex-col h-screen">
      <Header/>
      <div className="flex flex-row flex-1 overflow-hidden">
        <AppDrawer />
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}