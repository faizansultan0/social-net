import htmlParser from "html-react-parser";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  //   faHeart as regularHeart,
  faComment,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import "./postList.css";

const PostList = ({ posts, state, handleDelete }) => {
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
                    />
                  ) : (
                    post.postedBy.name[0]
                  )}
                </div>
                <div className="right-content">
                  <span className="name d-block">{post.postedBy.name}</span>
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
              <div className="icons-div d-flex align-items-center gap-3">
                <div className="icon-div d-inline-flex align-items-center gap-1 m-0">
                  <FontAwesomeIcon
                    icon={solidHeart}
                    className="text-danger h5"
                  />
                  <span>3 likes</span>
                </div>
                <div className="icon-div d-inline-flex align-items-center gap-1 m-0">
                  <FontAwesomeIcon icon={faComment} className="h5" />
                  <span>2 comments</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
