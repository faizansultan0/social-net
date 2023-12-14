import UserRoute from "../routes/userRoute";
import {
	Container,
	Row,
	Col,
	Spinner,
	Card,
	Modal,
	Form,
	Button,
} from "react-bootstrap";
import PostForm from "./postForm/postForm";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context";
import { toast } from "react-toastify";
import axios from "axios";
import PostList from "./postList/postList";
import PeopleList from "./peopleList/peopleList";
import "./dashboard.css";

const Dashboard = () => {
	// User Context
	const [state, setState] = useContext(UserContext);

	// Post Content States
	const [content, setContent] = useState("");
	const [image, setImage] = useState({});
	const [uploading, setUploading] = useState(false);

	// Displaying Posts
	const [posts, setPosts] = useState([]);
	const [postsLoading, setPostsLoading] = useState(false);

	// Find People
	const [people, setPeople] = useState([]);
	const [peopleLoading, setPeopleLoading] = useState(false);

	// Comments
	const [comment, setComment] = useState("");
	const [visible, setVisible] = useState(false);
	const [currentPost, setCurrentPost] = useState({});

	useEffect(() => {
		if (state && state.token) {
			newsFeed();
			findPeople();
		}
	}, [state, state.token]);

	const newsFeed = async () => {
		try {
			setPostsLoading(true);
			const { data } = await axios.get(`/news-feed`);
			// console.log('User Posts => ', data);
			setPosts(data);
			setPostsLoading(false);
			// console.log("Posts: ", posts);
		} catch (err) {
			console.log(err);
			setPostsLoading(false);
		}
	};

	const postSubmit = async (e) => {
		e.preventDefault();
		// console.log("Post: ", content);

		try {
			const { data } = await axios.post("/create-post", { content, image });
			// console.log('Create Post Res: ', data);
			if (data.error) {
				toast.error(data.error);
			} else {
				setPosts([data, ...posts]);
				newsFeed();
				toast.success("Post Created Successfully!");
				setContent("");
				setImage({});
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleImage = async (e) => {
		const file = e.target.files[0];
		// console.log('File is: ', file);
		const formData = new FormData();
		formData.append("image", file);
		// console.log('FormData is: ', [...formData]);
		setUploading(true);

		try {
			const { data } = await axios.post("/upload-image", formData);
			// console.log('Uploaded Image: ', data);
			setImage({
				url: data.url,
				publicId: data.public_id,
			});
			setUploading(false);
		} catch (err) {
			console.log(err);
			setUploading(false);
		}
	};

	const handleDelete = async (post) => {
		try {
			const answer = window.confirm("Are you sure want to delete Post?");
			if (!answer) return;
			await axios.delete(`/delete-post/${post._id}`);
			// console.log(data)
			toast.error("Post Deleted");
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};

	const handleFollow = async (user) => {
		// console.log('user to Follow: ', user);
		try {
			const { data } = await axios.put("/user-follow", { _id: user._id });
			// console.log('Handle Follow Response: ', data)
			let auth = JSON.parse(localStorage.getItem("auth"));
			auth.user = data;
			localStorage.setItem("auth", JSON.stringify(auth));

			setState({ ...state, user: data });
			const filtered = people.filter((p) => p._id !== user._id);
			setPeople(filtered);
			newsFeed();
			toast.success(`Following ${user.name}`);
		} catch (err) {
			console.log(err);
		}
	};

	const findPeople = async () => {
		try {
			setPeopleLoading(true);
			const { data } = await axios.get("/find-people");
			setPeople(data);
			setPeopleLoading(false);
		} catch (err) {
			console.log(err);
			setPeopleLoading(false);
		}
	};

	const handleLike = async (_id) => {
		// console.log("Like this post ID: ", _id);
		try {
			const { data } = await axios.put("/like-post", { _id });
			// console.log("Liked: ", data);
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};

	const handleUnlike = async (_id) => {
		// console.log("Unlike this post ID: ", _id);
		try {
			const { data } = await axios.put("/unlike-post", { _id });
			// console.log("Unliked: ", data);
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};

	const handleComment = (post) => {
		setCurrentPost(post);
		setVisible(true);
	};

	const addComment = async (e) => {
		e.preventDefault();
		// console.log('Add comment ', comment, currentPost._id);
		try {
			const { data } = await axios.put("/add-comment", {
				postId: currentPost._id,
				comment,
			});

			console.log("Add Comment: ", data);
			setComment("");
			newsFeed();
			setVisible(false);
		} catch (err) {
			console.log(err);
		}
	};

	const removeComment = async (postId, comment) => {
		// console.log(postId, comment);
		let answer = window.confirm("Are you sure want to delete comment?");
		if (!answer) return;
		try {
			const { data } = await axios.put("/remove-comment", {
				postId,
				comment,
			});
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<UserRoute>
			<Container fluid>
				<div className="py-4">
					<h1 className="text-center">Newsfeed</h1>
				</div>

				<Row className="py-3">
					<Col md={8}>
						<PostForm
							content={content}
							setContent={setContent}
							postSubmit={postSubmit}
							handleImage={handleImage}
							uploading={uploading}
							image={image}
						/>

						{/* {postsLoading ? (
							// <div className="d-flex justify-content-center align-items-center">
							//   <Spinner />
							// </div>
							<>
								<Placeholder xs={6} />
								<Placeholder className="w-75" />{" "}
								<Placeholder style={{ width: "25%" }} />
								<Placeholder xs={6} />
								<Placeholder className="w-75" />{" "}
								<Placeholder style={{ width: "25%" }} />
								<Placeholder xs={6} />
							</>
						) : ( */}
						<PostList
							posts={posts}
							state={state}
							handleDelete={handleDelete}
							handleLike={handleLike}
							handleUnlike={handleUnlike}
							handleComment={handleComment}
							removeComment={removeComment}
						/>
						{/* )} */}
					</Col>
					<Col md={4}>
						<Card className="p-2 min-h-450">
							{state.user && state.user && state.user.following && (
								<Link
									to={`/user/following`}
									className="link-underline link-underline-opacity-0 mb-3"
								>{`${state.user.following.length} Following`}</Link>
							)}
							<h2 className="h5">About</h2>
							<p className="text-small">
								{state.user.about ? (
									state.user.about
								) : (
									<span className="text-muted">
										No About Information
									</span>
								)}
							</p>
							<h2 className="h5">Username</h2>
							<a
								href="/user/dashboard#"
								className="text-small d-block mb-3"
							>
								{state.user.username}
							</a>
							<h2 className="h5">Find People</h2>
							{peopleLoading ? (
								<div className="d-flex justify-content-center align-items-center min-h-200">
									<Spinner />
								</div>
							) : (
								<PeopleList
									people={people}
									handleFollow={handleFollow}
								/>
							)}
						</Card>
					</Col>
				</Row>
				<Modal show={visible} onHide={() => setVisible(false)}>
					<Modal.Header closeButton>
						<Modal.Title>Comments</Modal.Title>
					</Modal.Header>
					<Modal.Body>Comments will be shown here</Modal.Body>
					<Modal.Footer>
						<Form onSubmit={addComment} className="w-100 d-flex gap-2">
							<Form.Control
								size="sm"
								type="text"
								placeholder="Write something..."
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
							<Button type="submit" size="sm">
								Submit
							</Button>
						</Form>
					</Modal.Footer>
				</Modal>
			</Container>
		</UserRoute>
	);
};

export default Dashboard;
