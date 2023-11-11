import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import Dashboard from './components/dashboard/dashboard';
import PageNotFound from './components/pageNotFound/pageNotFound';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './components/forgotPassword/forgotPassword';
import EditPost from './components/editPost/editPost';
import ProfileUpdate from './components/profileUpdate/profileUpdate';

const PageRoutes = () => {
    return (
        <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user/dashboard' element={<Dashboard />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/user/post/:_id' element={<EditPost />} />
            <Route path='/user/profile/update' element={<ProfileUpdate />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default PageRoutes;