import Login from "./components/login/login";
import Register from "./components/register/register";
import Dashboard from "./components/dashboard/dashboard";
import PageNotFound from "./components/pageNotFound/pageNotFound";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/forgotPassword/forgotPassword";
import EditPost from "./components/editPost/editPost";
import ProfileUpdate from "./components/profileUpdate/profileUpdate";
import Following from "./components/following/following";
import PostComments from "./components/postPage/postPage";
import PublicProfile from "./components/publicProfile/publicProfile";

const PageRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/user/post/:_id" element={<EditPost />} />
			<Route path="/user/profile/update" element={<ProfileUpdate />} />
			<Route path="/user/following" element={<Following />} />
			<Route path={`/post/:_id`} element={<PostComments />} />
			<Route path='/user/:username' element={<PublicProfile />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};

export default PageRoutes;
