import htmlParser from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
	faHeart as regularHeart,
	faComment,
	faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
	faHeart as solidHeart,
	faPencil,
} from "@fortawesome/free-solid-svg-icons";
import "./postList.css";

const PostList = ({
	posts,
	state,
	handleDelete,
	handleLike,
	handleUnlike,
	handleComment,
	removeComment,
}) => {
	// console.log(`Received Posts: `, posts);
	// console.log('State Received for the List is:=> ', state)
	return (
		<div>
			{posts &&
				posts.map((post) => (
					<div key={post._id} className="card mb-5 user-post">
						<div className="card-header">
							<div className="left-part">
								<div className="bg-dark text-light rounded-circle post-avatar sm-round-parent">
									{post.postedBy.image ? (
										<img
											className="sm-round-img"
											src={post.postedBy.image.url}
											alt={post.postedBy.name}
										/>
									) : (
										post.postedBy.name[0]
									)}
								</div>
								<div className="right-content">
									<span className="name d-block">
										{post.postedBy.name}
									</span>
									<span className="date d-block">
										{moment(post.createdAt).fromNow()}
									</span>
								</div>
							</div>
							{state && post.postedBy._id === state.user._id && (
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
						<div className="card-body">{htmlParser(post.content)}</div>
						<div className="card-footer">
							{post.image && (
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
									<span>{post.likes.length} likes</span>
								</div>
								<button
									onClick={() => {
										handleComment(post);
									}}
									className="border-0 font-weight-normal icon-div d-inline-flex align-items-center gap-1 m-0"
								>
									<FontAwesomeIcon icon={faComment} className="h5" />
									<span>
										<Link
											className="text-decoration-none"
											to={`/post/${post._id}`}
										>
											{post.comments.length} comments
										</Link>
									</span>
								</button>
							</div>
							{/* 2 Comments */}
							<div className="comments-div pt-2">
								{post.comments && post.comments.length > 0 && (
									<>
										<ul className="list-group ps-3">
											{post.comments.slice(0, 2).map((c) => (
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
																		src={c.postedBy.image.url}
																		alt={c.postedBy.name}
																	/>
																) : (
																	c.postedBy.name[0]
																)}
															</div>
															<span className="comment-poster-name">{c.postedBy.name}</span>
														</div>
														<p className="mb-0 comment-line">{c.text}</p>
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
																		onClick={() =>
																			removeComment(
																				post._id,
																				c
																			)
																		}
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
				))}
		</div>
	);
};

export default PostList;
