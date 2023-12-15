import { useState, useContext } from "react";
import { UserContext } from "../../../context";
import PeopleList from "../peopleList/peopleList";
import {toast} from 'react-toastify';
import axios from "axios";

const SearchForm = () => {
	const [state, setState] = useContext(UserContext);

	const [query, setQuery] = useState("");
	const [result, setResult] = useState([]);

	const handleFollow = async (user) => {
		// console.log('user to Follow: ', user);
		try {
			const { data } = await axios.put("/user-follow", { _id: user._id });
			// console.log('Handle Follow Response: ', data)
			let auth = JSON.parse(localStorage.getItem("auth"));
			auth.user = data;
			localStorage.setItem("auth", JSON.stringify(auth));

			setState({ ...state, user: data });
			const filtered = result.filter((p) => p._id !== user._id);
			setResult(filtered);
			toast.success(`Following ${user.name}`);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUnfollow = async (user) => {
		try {
			const { data } = await axios.put("/user-unfollow", { _id: user._id });
			let auth = JSON.parse(localStorage.getItem("auth"));
			auth.user = data;
			localStorage.setItem("auth", JSON.stringify(auth));
			setState({ ...state, user: data });

			let filtered = result.filter((p) => p._id !== user._id);
			setResult(filtered);
			toast.error(`Unfollowed ${user.name}`);
		} catch (err) {
			console.log(err);
		}
	};

	const searchUser = async (e) => {
		e.preventDefault();
		// console.log(`Find ${query} from DB`)
		try {
			const { data } = await axios.get(`/search-user/${query}`);
			setResult(data);
			// console.log("Search User Response ", data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="card p-2">
			<form className="row" onSubmit={searchUser}>
				<div className="col-8">
					<input
						onChange={(e) => {
							setQuery(e.target.value);
							setResult([]);
						}}
						value={query}
						className="form-control border border-1 border-secondary"
						type="search"
						placeholder="Search"
					/>
				</div>
				<div className="col-4">
					<button className="btn btn-primary col-12" type="submit">
						Search
					</button>
				</div>
			</form>
			{result && (
				<PeopleList
					people={result}
					handleFollow={handleFollow}
					handleUnfollow={handleUnfollow}
				/>
			)}
		</div>
	);
};

export default SearchForm;
