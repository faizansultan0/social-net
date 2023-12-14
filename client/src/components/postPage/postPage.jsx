import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import htmlParser from "html-react-parser";
import {
	faHeart as regularHeart,
	faComment,
	faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
	faHeart as solidHeart,
	faPencil,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Modal, Button, Form } from "react-bootstrap";
import { UserContext } from "../../context";
import UserRoute from "../routes/userRoute";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

const PostComments = () => {
	const [post, setPost] = useState({});
	const [state] = useContext(UserContext);

	// Comments
	const [comment, setComment] = useState("");
	const [visible, setVisible] = useState(false);
	const [currentPost, setCurrentPost] = useState({});

	const { _id } = useParams();
	// console.log(_id);

	useEffect(() => {
		if (_id && state && state.token) {
			fetchPost();
		}
	}, [_id, state]);

	const fetchPost = async () => {
		try {
			const { data } = await axios.get(`/user-post/${_id}`);
			setPost(data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async (post) => {
		try {
			const answer = window.confirm("Are you sure want to delete Post?");
			if (!answer) return;
			await axios.delete(`/delete-post/${post._id}`);
			// console.log(data)
			toast.error("Post Deleted");
			fetchPost();
		} catch (err) {
			console.log(err);
		}
	};

	const handleLike = async (_id) => {
		// console.log("Like this post ID: ", _id);
		try {
			await axios.put("/like-post", { _id });
			// const { data } = await axios.put("/like-post", { _id });
			// console.log("Liked: ", data);
			fetchPost();
		} catch (err) {
			console.log(err);
		}
	};

	const handleUnlike = async (_id) => {
		// console.log("Unlike this post ID: ", _id);
		try {
			await axios.put("/unlike-post", { _id });
			// console.log("Unliked: ", data);
			fetchPost();
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
			await axios.put("/add-comment", {
				postId: currentPost._id,
				comment,
			});

			// console.log("Add Comment: ", data);
			setComment("");
            fetchPost();
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
			await axios.put("/remove-comment", {
				postId,
				comment,
			});
			fetchPost();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Container>
				<UserRoute>
					<div className="back-div py-2">
						<Link to="/user/dashboard" className="text-decoration-none">
							<FontAwesomeIcon className="pe-2" icon={faArrowLeft} />
							Back
						</Link>
					</div>
					{post && post.postedBy && (
						<div key={post._id} className="card mb-5 user-post">
							<div className="card-header">
								<div className="left-part">
									<div className="bg-dark text-light rounded-circle post-avatar sm-round-parent">
										{post && post.postedBy && post.postedBy.image ? (
											<img
												className="sm-round-img"
												src={post.postedBy.image.url}
												alt={post.postedBy.name}
											/>
										) : (
											post &&
											post.postedBy &&
											post.postedBy.name &&
											post.postedBy.name[0]
										)}
									</div>
									<div className="right-content">
										<span className="name d-block">
											{post &&
												post.postedBy &&
												post.postedBy.name &&
												post.postedBy.name}
										</span>
										<span className="date d-block">
											{moment(post.createdAt).fromNow()}
										</span>
									</div>
								</div>
								{state &&
									post &&
									post.postedBy &&
									post.postedBy._id === state.user._id && (
										<div className="right-part">
											<Link
												to={`/user/post/${post._id}`}
												className="right-icon-btn"
											>
												<FontAwesomeIcon icon={faPencil} />
											</Link>
											<button
												onClick={() => handleDelete(post)}
												className="border-0 right-icon-btn"
											>
												<FontAwesomeIcon icon={faTrashCan} />
											</button>
										</div>
									)}
							</div>
							<div className="card-body">
								{post && post.content && htmlParser(post.content)}
							</div>
							<div className="card-footer">
								{post && post.image && (
									<div className="post-img-div mb-2">
										<img
											src={post.image.url}
											alt="User Post"
											className="post-img"
										/>
									</div>
								)}
								<div className="icons-div d-flex align-items-center gap-3 mb-1">
									<div className="icon-div d-inline-flex align-items-center gap-1 m-0">
										{state &&
										state.user &&
										post.likes &&
										post.likes.includes(state.user._id) ? (
											<FontAwesomeIcon
												icon={solidHeart}
												className="text-danger h5"
												onClick={() => handleUnlike(post._id)}
											/>
										) : (
											<FontAwesomeIcon
												icon={regularHeart}
												className="text-danger h5"
												onClick={() => handleLike(post._id)}
											/>
										)}
										<span>
											{post &&
												post.likes &&
												post.likes.length &&
												post.likes.length}{" "}
											likes
										</span>
									</div>
									<button
										onClick={() => {
											handleComment(post);
										}}
										className="border-0 font-weight-normal icon-div d-inline-flex align-items-center gap-1 m-0"
									>
										<FontAwesomeIcon
											icon={faComment}
											className="h5"
										/>
										<span>
											<Link
												className="text-decoration-none"
												to={`/post/${post._id}`}
											>
												{post &&
													post.comments &&
													post.comments.length &&
													post.comments.length}{" "}
												comments
											</Link>
										</span>
									</button>
								</div>
								{/* 2 Comments */}
								<div className="comments-div">
									{post.comments && post.comments.length > 0 && (
										<>
											<ul className="list-group ps-3">
												{post.comments.map((c) => (
													<li
														key={c._id}
														className="list-group-item d-flex justify-content-between align-items-start ps-2 border border-2 mb-2"
													>
														<div>
															<div className="d-flex comment-header mb-1">
																<div className="bg-dark text-light rounded-circle post-avatar sm-round-parent">
																	{c.postedBy.image ? (
																		<img
																			className="sm-round-img"
																			src={
																				c.postedBy.image.url
																			}
																			alt={c.postedBy.name}
																		/>
																	) : (
																		c.postedBy.name[0]
																	)}
																</div>
																<span className="comment-poster-name">
																	{c.postedBy.name}
																</span>
															</div>
															<p className="mb-0 comment-line">
																{c.text}
															</p>
														</div>
														<div className="badge rounded-pill text-muted">
															{moment(c.created).fromNow()}
															{state &&
																state.user &&
																state.user._id ===
																	c.postedBy._id && (
																	<div className="mt-3 ml-auto d-flex justify-content-end">
																		<FontAwesomeIcon
																			icon={faTrashCan}
																			className="text-danger"
																			onClick={() => {
																				removeComment(
																					post._id,
																					c
																				);
																			}}
																		/>
																	</div>
																)}
														</div>
													</li>
												))}
											</ul>
										</>
									)}
								</div>
							</div>
						</div>
					)}
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
				</UserRoute>
			</Container>
		</>
	);
};

export default PostComments;
