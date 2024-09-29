import {createBrowserRouter} from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import App from '../App';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import VerifyPasswordPage from '../pages/VerifyPasswordPage';
import HomePage from '../pages/HomePage';
import MessageComponent from '../components/MessageComponent';
const router = createBrowserRouter([
    {
        path: '/',
        element : <App/>,
        children:[
            {
                path:'register',
                element:<RegisterPage/>
            },{
                path:'email',
                element: <VerifyEmailPage/>
            },{
                path:'password',
                element:<VerifyPasswordPage/>
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