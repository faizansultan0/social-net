import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import Dashboard from './components/dashboard/dashboard';
import PageNotFound from './components/pageNotFound/pageNotFound';
import { Routes, Route } from 'react-router-dom';

const PageRoutes = () => {
    return (
        <Routes>
            <Route index path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user/dashboard' element={<Dashboard />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default PageRoutes;