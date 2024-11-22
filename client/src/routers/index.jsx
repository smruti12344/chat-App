import {createBrowserRouter} from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import App from '../App';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import VerifyPasswordPage from '../pages/VerifyPasswordPage';
import HomePage from '../pages/HomePage';
import MessageComponent from '../components/MessageComponent';
import AuthLayout from '../layouts';
import ForgotPassword from '../pages/ForgotPassword';
const router = createBrowserRouter([
    {
        path: '/',
        element : <App/>,
        children:[
            {
                path:'register',
                element:<AuthLayout><RegisterPage/></AuthLayout>
            },{
                path:'email',
                element: <AuthLayout><VerifyEmailPage/></AuthLayout>
            },{
                path:'password',
                element:<AuthLayout><VerifyPasswordPage/></AuthLayout>
            },
            {
                path:'forgot-password',
                element:<AuthLayout><ForgotPassword/></AuthLayout>
            },{
                path:'',
                element: <HomePage/>,
                children:[
                   {
                    path:':userid',
                    element:<MessageComponent/>
                   }
                    
                ]
            }
        ]
    }
])
export default router;