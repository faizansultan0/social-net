import UserRoute from "../routes/userRoute";
import { Container, Row, Col } from "react-bootstrap";
import CreatePostForm from "./createPostForm/createPostForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

const Dashboard = () => {
  // Post Content States
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);


  // const navigate = useNavigate();

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("Post: ", content);

    try {
      const { data } = await axios.post('/create-post', { content, image });
      // console.log('Create Post Res: ', data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post Created Successfully!");
        setContent('');
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
    formData.append('image', file);
    // console.log('FormData is: ', [...formData]);
    setUploading(true);

    try {
      const { data } = await axios.post('/upload-image', formData)
      // console.log('Uploaded Image: ', data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      })
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  }

  return (
    <UserRoute>
      <Container fluid>
        <div className="py-4">
          <h1 className="text-center">Newsfeed</h1>
        </div>

        <Row className="py-3">
          <Col md={8}>
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
          </Col>
          <Col md={4}><p>Sidebar</p></Col>
        </Row>
      </Container>
    </UserRoute>
  );
};

export default Dashboard;
