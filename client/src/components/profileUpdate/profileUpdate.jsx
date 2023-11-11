import { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Spinner, Image } from "react-bootstrap";
import { UserContext } from "../../context";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import './profileUpdate.css'

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [secret, setSecret] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Profile Image
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (state && state.user) {
      setUsername(state.user.username || "");
      setAbout(state.user.about || "");
      setName(state.user.name || "");
      setEmail(state.user.email || "");
      setImage(state.user.image || {});
    }
  }, [state, state.user]);

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

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(`NAME: ${name}, EMAIL: ${email}, SECRET: ${secret}, PASSWORD: ${password}`);
    try {
      // console.log(username, about, name, email, secret, password, image);
      setLoading(true);
      let { data } = await axios.put(`/profile-update`, {
        username,
        about,
        name,
        email,
        secret,
        password,
        image
      });

      // console.log('Update Profile Response: ', data)

      if (data.err) {
        toast.error(data.err);
        setLoading(false);
      } else {
        toast.success("Profile Updated Successfully");
        setLoading(false);
        setUsername(data.username);
        setAbout(data.about);
        setName(data.name);
        setImage(data.image);

        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));

        setState({ ...state, user: data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register profileUpdatePage">
      <Container fluid>
        <h1 className="text-center py-2">Profile</h1>
        <label className="profile-labeldiv d-flex justify-content-center align-items-center">
          {image && image.url ? (
            <div className="profile-img-div">
              <Image src={image.url} roundedCircle className="profile-img" />
            </div>
          ) : uploading ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <FontAwesomeIcon icon={faCamera} />
          )}
          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>
        <Row className="py-3 m-0">
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-muted">About</Form.Label>
                <Form.Control
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  type="text"
                  placeholder="Write about yourself"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Your Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  disabled
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-muted">Pick a question</Form.Label>
                <Form.Select>
                  <option>What is your favourite color?</option>
                  <option>What is your best friend's name?</option>
                  <option>What is your birth city?</option>
                </Form.Select>
                <Form.Text>
                  You can use this to reset your password if forgotten.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  type="text"
                  placeholder="Write your answer here"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-muted">Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
              <button disabled={loading || uploading} className="btn btn-primary w-100 mb-3">
                {loading ? (
                  <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  "Update Profile"
                )}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileUpdate;
