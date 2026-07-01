import {createBrowserRouter, Navigate} from 'react-router'
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/chat/pages/Dashboard';
import Protected from '../features/auth/components/Protected';
import WildCard from '../app/WildCard.jsx';

const authRouter=createBrowserRouter([
    {
        path:'/',
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
        path:'/dashboard',
        element:<Navigate to='/' replace />
    },
    {
        path:'*',
        element:<WildCard/>
    }
])

export default authRouter;