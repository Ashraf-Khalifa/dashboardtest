/*!

=========================================================
* Paper Dashboard React - v1.3.2
===================================================
=====================================================


*/
import axios from "axios";
import React, { useState,useEffect } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Table,
} from "reactstrap";
import Tables from "./Tables";



function Blog() {
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateBlogId, setUpdateBlogId] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateImage, setUpdateImage] = useState(""); // Separate state for image
  const [updateDetails, setUpdateDetails] = useState(""); // Separate state for details
  const [del, setDel] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://monkfish-app-wyvrc.ondigitalocean.app/blog/data");
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting Blog from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);
  const handlePost = async () => {
    try {
      const response = await axios.post(
        "https://monkfish-app-wyvrc.ondigitalocean.app/blog/add",
        {
          title: updateTitle, // Use the provided title
          date: updateDate, // Use the provided date
          details: updateDetails, // Use the provided details
          image_blog: updateImage,
        
        }
      );
      console.log(response.data);
      // Call the onSave callback with the data
      setAdd(response.data);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };
  const openUpdateForm = (p_id) => {
    setIsUpdateFormVisible(true);
    setUpdateBlogId(p_id);
  };

  const handleUpdate = async (blog_id) => {
    try {
      const response = await axios.put(
        `https://monkfish-app-wyvrc.ondigitalocean.app/blog/edit/${blog_id}`,
        {
          title: updateTitle, // Use the provided title
          date: updateDate, // Use the provided date
          details: updateDetails, // Use the provided details
          image_blog: updateImage, // Use the provided image
        }
      );
      console.log(response.data);
      setAdd((prevAdd) =>
        prevAdd.map((blog) =>
          blog.blog_id === blog_id ? response.data : blog
        )
      );
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (blog_id, index) => {
    try {
      const response = await axios.delete(
        `https://monkfish-app-wyvrc.ondigitalocean.app/blog/delete/${blog_id}`
      );
      console.log(blog_id);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.blog_id !== blog_id)
      );

      setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Blog</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          type="text"
                          onChange={(e) => setUpdateTitle(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          type="text"
                          onChange={(e) => setUpdateDate(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Image </label>
                        <Input
                          type="file"
                          onChange={(e) => setUpdateImage(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Details</label>
                        <Input
                          type="textarea"
                          onChange={(e) => setUpdateDetails(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={handlePost}
                      >
                        Add Blog
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Blog Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Image</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((blog, index) => (
                        <tbody key={blog.blog_id}>
                          <tr key={blog.blog_id}>
                            <td>{blog.title}</td>
                            <td>{blog.date}</td>
                            <td>
                              <img src={blog.image_blog} alt="" />
                            </td>
                            <td>{blog.details}</td>

                            <td>
                              <button
                                onClick={
                                  () => handleDelete(blog.blog_id, index) // Calling handleDelete with the product's _id and index
                                }
                              >
                                delete
                              </button>
                              <button
                                onClick={() => openUpdateForm(blog.blog_id)}
                              >
                                update
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Row>
          <Col md="12">
            <Card className="card-user">
              {isUpdateFormVisible && (
                <div>
                  <CardHeader>
                    <CardTitle tag="h5">Update Blog</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Title</label>
                            <Input
                              type="text"
                              value={updateTitle}
                              onChange={(e) => setUpdateTitle(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Date</label>
                            <Input
                              type="text"
                              value={updateDate}
                              onChange={(e) => setUpdateDate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">Image</label>
                            <Input
                              type="file"
                              value={updateImage}
                              onChange={(e) => setUpdateImage(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Details</label>
                            <Input
                              type="textarea"
                              value={updateDetails}
                              onChange={(e) => setUpdateDetails(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                            onClick={() => handleUpdate(updateBlogId)}
                          >
                            Update Blog
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Blog;
