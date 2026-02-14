import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import AppProvider from './providers/AppProvider.jsx'
import PostDetail from './pages/PostDetail.jsx'
import AddPostPage from './pages/AddPostPage.jsx'
import NotFound from './pages/NotFound.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminRoute from './components/AdminRoute.jsx'

const queryClient =  new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/register',
        element: <Register/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/PostDetail/:id',
        element: <PostDetail/>
      },
      {
        path: '*',
        element: <NotFound/>
      },
      {
        element: <AdminRoute/>,
        children: [
          {
            path: '/add',
            element: <AddPostPage/>
          }
        ]
      }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
      <AppProvider>
        <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
      </AppProvider>
  </QueryClientProvider>
)
