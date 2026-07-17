import {createBrowserRouter, Navigate} from 'react-router'
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/chat/pages/Dashboard';
import Protected from '../features/auth/components/Protected';
import WildCard from '../app/WildCard.jsx';
import Landing from '../features/auth/pages/Landing'
import About from '../features/chat/pages/About.jsx';

const authRouter=createBrowserRouter([
    {
        path:'/get-started',
        element:<Landing/>
    },
    {
        path:'/dashboard',
        element:<Protected>
            <Dashboard/>
        </Protected>
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    {
        path:'/',
        element:<Navigate to='/get-started' replace />
    },
    {
        path:'/about',
        element:<About/>
    },
    {
        path:'*',
        element:<WildCard/>
    },
])

export default authRouter;