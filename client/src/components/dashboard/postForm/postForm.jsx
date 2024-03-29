import { Form, Spinner, Image } from "react-bootstrap";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "react-quill/dist/quill.snow.css";
import "./postForm.css";

const PostForm = ({
	content,
	setContent,
	postSubmit,
	handleImage,
	uploading,
	image,
}) => {
	return (
		<Form onSubmit={postSubmit} className="mb-4">
			<div className="card">
				<div className="card-body">
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<ReactQuill
							theme="snow"
							as="textarea"
							value={content}
							onChange={(e) => setContent(e)}
							rows={3}
							placeholder="Write Something..."
						/>
					</Form.Group>
				</div>

				<div className="card-footer d-flex justify-content-between text-muted">
					<button
						disabled={
							uploading || (!content && Object.keys(image).length === 0)
						}
						className="btn btn-sm btn-primary mt-1"
					>
						Post
					</button>
					<label>
						{/* <FontAwesomeIcon icon={faCamera} className="mt-2" /> */}
						{image && image.url ? (
							<Image src={image.url} roundedCircle className="avatar" />
						) : uploading ? (
							<Spinner animation="border" role="status" size="sm">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						) : (
							<FontAwesomeIcon icon={faCamera} className="mt-2" />
						)}
						<input
							onChange={handleImage}
							type="file"
							accept="images/*"
							hidden
						/>
					</label>
				</div>
			</div>
		</Form>
	);
};

export default PostForm;
