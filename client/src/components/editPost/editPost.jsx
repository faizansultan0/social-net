import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostForm from "../dashboard/postForm/postForm";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import UserRoute from "../routes/userRoute";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const params = useParams();
  // console.log(params);
  const _id = params._id;

  const navigate = useNavigate();

  // Post Content States
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getCurrentPost = async () => {
      try {
        const { data } = await axios.get(`/user-post/${_id}`);
        // console.log("Received Post Data: ", data);
        setContent(data.content);
        setImage(data.image);
      } catch (err) {
        console.log(err);
      }
    };
    if(_id) getCurrentPost();
  }, [_id]);
  

  // Submit Post Update
  const postSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/update-post/${_id}`, {
        content,
        image,
      });
      if (data.err) {
        toast.error(data.err);
      } else {
        toast.success("Post updated successfully!");
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // If User Submit another Image
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
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <UserRoute>
      <Container fluid>
        <div className="py-4">
          <h1 className="text-center">Update Post</h1>
        </div>

        <Row className="py-3">
          <Col md={8} className="offset-md-2">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </Col>
        </Row>
      </Container>
    </UserRoute>
  );
};

export default EditPost;
