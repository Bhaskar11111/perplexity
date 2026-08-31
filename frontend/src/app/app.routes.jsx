import React, { Suspense, lazy } from 'react'
import {createBrowserRouter, Navigate} from 'react-router'
import Protected from '../features/auth/components/Protected';
import WildCard from '../app/WildCard.jsx';

const Landing = lazy(() => import('../features/auth/pages/Landing'))
const Login = lazy(() => import('../features/auth/pages/Login'))
const Register = lazy(() => import('../features/auth/pages/Register'))
const Dashboard = lazy(() => import('../features/chat/pages/Dashboard'))
const About = lazy(() => import('../features/chat/pages/About.jsx'))

const RouteFallback = () => (
    <div className="min-h-dvh bg-[#111] text-white" />
)

const withSuspense = (element) => (
    <Suspense fallback={<RouteFallback />}>
        {element}
    </Suspense>
)

const authRouter=createBrowserRouter([
    {
        path:'/get-started',
        element:withSuspense(<Landing/>)
    },
    {
        path:'/dashboard',
        element:withSuspense(<Protected>
            <Dashboard/>
        </Protected>)
    },
    {
        path:'/login',
        element:withSuspense(<Login/>)
    },
    {
        path:'/register',
        element:withSuspense(<Register/>)
    },
    {
        path:'/',
        element:<Navigate to='/get-started' replace />
    },
    {
        path:'/about',
        element:withSuspense(<About/>)
    },
    {
        path:'*',
        element:<WildCard/>
    },
])

export default authRouter;
