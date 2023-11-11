import UserRoute from "../routes/userRoute";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import PostForm from "./postForm/postForm";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import PostList from "./postList/postList";

const Dashboard = () => {
  // User Context
  const [state] = useContext(UserContext);

  // Post Content States
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);

  // const navigate = useNavigate();
  const fetchUserPosts = async () => {
    try {
      setPostsLoading(true);
      const { data } = await axios.get("/user-posts");
      // console.log('User Posts => ', data);
      setPosts(data);
      setPostsLoading(false);
      // console.log("Posts: ", posts);
    } catch (err) {
      console.log(err);
      setPostsLoading(false);
    }
  };

  useEffect(() => {
    if (state && state.token) fetchUserPosts();
  }, [state, state.token]);

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("Post: ", content);

    try {
      const { data } = await axios.post("/create-post", { content, image });
      // console.log('Create Post Res: ', data);
      if (data.error) {
        toast.error(data.error);
      } else {
        await fetchUserPosts();
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
      fetchUserPosts();
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

            {postsLoading ? (
              <Spinner />
            ) : (
              <PostList
                posts={posts}
                state={state}
                handleDelete={handleDelete}
              />
            )}
          </Col>
          <Col md={4}>
            <p>Sidebar</p>
          </Col>
        </Row>
      </Container>
    </UserRoute>
  );
};

export default Dashboard;
