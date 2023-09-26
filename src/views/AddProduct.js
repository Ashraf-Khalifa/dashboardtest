import axios from "axios";
import React, { useState, useEffect } from "react";

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

function AddProduct() {
  const [product_name, setProduct_name] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [old_price, setOld_price] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [color_id, setColorId] = useState("");
  const [image_main, setImgMain] = useState("");
  const [image_slider, setImageSlider] = useState([]);
  const [add, setAdd] = useState([]);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const [updateProductId, setUpdateProductId] = useState("");
  const [del, setDel] = useState([]);
  const [colors, setColors] = useState([]);

  const [categories, setCategories] = useState([]);
  const [openImage, setOpenImage] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const MAX_COUNT = 5;
  const [images, setImages] = useState([]);
  const [product_id, setProductId] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  const handleProductIdChange = (e) => {
    setProductId(e.target.value);
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const fileURLs = [];

    chosenFiles.forEach((file) => {
      const objectURL = URL.createObjectURL(file);
      fileURLs.push(objectURL);
    });

    setImageSlider(fileURLs);
    handleUploadFiles(chosenFiles);
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://monkfish-app-wyvrc.ondigitalocean.app/productdetails/getproductdetails"
        );
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting product from frontend: ${error}`);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://monkfish-app-wyvrc.ondigitalocean.app/category/getproducts"
        );
        setCategories(response.data); // Assuming the response contains the list of categories
      } catch (error) {
        console.log(`Error fetching categories: ${error}`);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await axios.get(
          "https://monkfish-app-wyvrc.ondigitalocean.app/color/getproductdetails"
        );
        setColors(response.data); // Assuming the response contains the list of colors
      } catch (error) {
        console.log(`Error fetching colors: ${error}`);
      }
    };

    fetchCategories();
    fetchColors();

    fetchData();
  }, []);

  const handlePost = async () => {
    if (!category_id) {
      alert("Please select a category.");
      return;
    }

    try {
      const imageUrls = image_slider.join(",");
      // ... other data
      const response = await axios.post(
        "https://monkfish-app-wyvrc.ondigitalocean.app/productdetails/add",
        {
          product_name,
          price,
          stock,
          old_price,
          category_id,
          color_id,
          image_main,
          image_slider: imageUrls, // Pass the string of image URLs
        }
      );

      console.log(response.data);
      setAdd(response.data);
      setOpenImage(true);
    } catch (error) {
      console.log(`Error fetching post data  ${error}`);
    }
  };

  const openUpdateForm = (p_id) => {
    setIsUpdateFormVisible(true);
    setUpdateProductId(p_id);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("product_id", product_id);
      images.forEach((image) => {
        formData.append("image", image);
      });

      const response = await axios.post(
        "https://monkfish-app-wyvrc.ondigitalocean.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading images:", error);
      setMessage("Image upload failed");
    }
  };


  const handleUpdate = async (
    p_id,
    product_name,
    price,
    stock,
    old_price,
    category_id,
    color_id,
    image_main,
    image_slider
  ) => {
    try {
      setUpdateProductId(p_id);

      const response = await axios.put(
        `https://monkfish-app-wyvrc.ondigitalocean.app/productdetails/edit/${p_id}`,
        {
          product_name,
          price,
          stock,
          old_price,
          category_id,
          color_id,
          image_main,
          image_slider, // Pass the array of image URLs
        }
      );
      console.log("hello");
      console.log(response.data);
      setAdd("res", response.data);
      setIsUpdateFormVisible(false);
    } catch (error) {
      console.log(`Error in fetch edit data: ${error}`);
    }
  };

  const handleDelete = async (p_id) => {
    try {
      const response = await axios.delete(
        `https://monkfish-app-wyvrc.ondigitalocean.app/productdetails/delete/${p_id}`
      );
      console.log(p_id);
      console.log(response);

      setAdd((prevProduct) =>
        prevProduct.filter((product) => product.p_id !== p_id)
      );

      // setDel((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(error);
    }
  };

  console.log("add", add);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Product</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Product Name</label>
                        <Input
                          type="text"
                          onChange={(e) => setProduct_name(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Price</label>
                        <Input
                          type="text"
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Stock </label>
                        <Input
                          type="text"
                          onChange={(e) => setStock(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Old Price</label>
                        <Input
                          type="text"
                          onChange={(e) => setOld_price(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1 mt-4" md="6">
                      <FormGroup>
                        <label>Category</label>
                        <select
                          value={category_id}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option
                              key={category.category_id}
                              value={category.category_id}
                            >
                              {category.category_name}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Color</label>
                        <select
                          value={color_id}
                          onChange={(e) => setColorId(e.target.value)}
                        >
                          <option value="">Select a color</option>
                          {colors.map((color) => (
                            <option key={color.color_id} value={color.color_id}>
                              {color.color_name}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="button"
                        onClick={handlePost}
                      >
                        Add Product
                      </Button>
                    </div>
                  </Row>
                </Form>
                <Row>
                  {openImage && (
                    <div>
                      <Col className="pl-1" md="6">
                        <div>
                          <label htmlFor="productId">Product ID:</label>
                          <input
                            type="text"
                            id="productId"
                            value={product_id}
                            onChange={handleProductIdChange}
                          />
                        </div>
                        <FormGroup
                          action="/addproduct"
                          method="POST"
                          enctype="multipart/form-data"
                        >
                          <label>image_main</label>
                          <Input
                            type="file"
                            name="image"
                            // onChange={(e) => setImgMain(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>image slider</label>
                          <Input
                            type="file"
                            multiple
                            accept="application/pdf, image/png"
                            onChange={handleFileEvent}
                            disabled={fileLimit}
                          />
                          <label htmlFor="fileUpload"></label>

                          {/* {image_slider.map((imageUrl, index) => (
                      <div key={index}>
                        <img src={imageUrl} alt="" />
                      </div>
                    ))} */}
                        </FormGroup>
                        {message && <p>{message}</p>}

                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={handleUpload}
                          >
                            Add Image
                          </Button>
                        </div>
                      </Col>
                    </div>
                  )}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Products Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>product_name</th>
                        <th>price</th>
                        <th>stock</th>
                        <th>old_price</th>
                        <th>category_id</th>
                        <th>color_id</th>
                        <th>img_main</th>
                        <th>image_slider</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(add) &&
                        add.map((product, index) => (
                          <tr key={product.p_id}>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.old_price}</td>
                            <td>{product.category_id}</td>
                            <td>{product.color_id}</td>
                            <td>
                              <img src={product.imagePath} alt="" />
                            </td>
                            <td>
                              <img
                                src={product.imagePath}
                                alt=""
                                onError={(e) =>
                                  console.log("Image load error", e)
                                }
                              />
                            </td>
                            <td>
                              <button
                                onClick={() => handleDelete(product.p_id)}
                              >
                                delete
                              </button>
                              <button
                                onClick={() => openUpdateForm(product.p_id)}
                              >
                                update
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
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
                    <CardTitle tag="h5">Update Product</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Product Name</label>
                            <Input
                              type="text"
                              onChange={(e) => setProduct_name(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Price</label>
                            <Input
                              type="text"
                              onChange={(e) => setPrice(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">Stock </label>
                            <Input
                              type="text"
                              onChange={(e) => setStock(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Old Price</label>
                            <Input
                              type="text"
                              onChange={(e) => setOld_price(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Category</label>
                            <select
                              value={category_id}
                              onChange={(e) => setCategoryId(e.target.value)}
                            >
                              <option value="">Select a category</option>
                              {categories.map((category) => (
                                <option
                                  key={category.category_id}
                                  value={category.category_id}
                                >
                                  {category.category_name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Color</label>
                            <select
                              value={color_id}
                              onChange={(e) => setColorId(e.target.value)}
                            >
                              <option value="">Select a color</option>
                              {colors.map((color) => (
                                <option
                                  key={color.color_id}
                                  value={color.color_id}
                                >
                                  {color.color_name}
                                </option>
                              ))}
                            </select>
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>img_main</label>
                            <Input
                              type="file"
                              onChange={(e) => setImgMain(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>image slider</label>
                            <Input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleFileEvent}
                              disabled={fileLimit}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
                 <Col md="12">
                   <FormGroup>
                     <label>Address</label>
                     <Input
                       defaultValue="Melbourne, Australia"
                       placeholder="Home Address"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col className="pr-1" md="4">
                   <FormGroup>
                     <label>City</label>
                     <Input
                       defaultValue="Melbourne"
                       placeholder="City"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
                 <Col className="px-1" md="4">
                   <FormGroup>
                     <label>Country</label>
                     <Input
                       defaultValue="Australia"
                       placeholder="Country"
                       type="text"
                     />
                   </FormGroup>
                 </Col>
                 <Col className="pl-1" md="4">
                   <FormGroup>
                     <label>Postal Code</label>
                     <Input placeholder="ZIP Code" type="number" />
                   </FormGroup>
                 </Col>
               </Row>
               <Row>
                 <Col md="12">
                   <FormGroup>
                     <label>About Me</label>
                     <Input
                       type="textarea"
                       defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                     />
                   </FormGroup>
                 </Col>
               </Row> */}
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="button"
                            onClick={() =>
                              handleUpdate(
                                updateProductId,
                                product_name,
                                price,
                                stock,
                                old_price,
                                category_id,
                                color_id,
                                image_main,
                                image_slider
                              )
                            }
                          >
                            Update Product
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

export default AddProduct;
