
import React ,{useEffect,useState}from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Table,
  Form, FormGroup, Input, Button
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";

function Dashboard() {
  const [product, setProduct] = useState([]);
  const [blog, setBlog] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    content: "",
  });
  const [eventImage, setEventImage] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [updateEvent, setUpdateEvent] = useState({
    title: "",
    date: "",
    content: "",
    image_path: "", // Assuming you want to show the current image
  })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    setEventImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", eventImage);
      formData.append("title", newEvent.title);
      formData.append("date", newEvent.date);
      formData.append("content", newEvent.content);

      const response = await axios.post(
        "https://lobster-app-8a4mx.ondigitalocean.app/event/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Event added successfully:", response.data);
      fetchData();
      setNewEvent({
        title: "",
        date: "",
        content: "",
      });
      setEventImage(null);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lobster-app-8a4mx.ondigitalocean.app/event/list"
      );
      setEvents(response.data.data);
      setLoading(false); // Set loading to false after data is fetched
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error(`Error getting data: ${error}`);
      setLoading(false); // Set loading to false in case of error
      setError("Error fetching data. Please try again later."); // Set the error message
    }
  };

  const handleDelete = async (eventId) => {
    console.log("Deleting event with ID:", eventId);
   
  
    try {
      // Send a DELETE request to delete the event from the database
      await axios.delete(
        `https://lobster-app-8a4mx.ondigitalocean.app/event/delete/${eventId}`
      );
  
      // After successfully deleting the event and its image (if it had one),
      // filter it out from the 'events' state array
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== eventId)
      );
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  
  
  
  
  
  

  const handleUpdate = (event) => {
    setSelectedEventId(event.id); // Set the selected event ID
    setUpdateEvent({
      title: event.title,
      date: event.date,
      content: event.content,
      image_path: event.image_path, // Set the current image path
    });
    setShowUpdateForm(true); // Display the update form
  };
  

  const handleEventUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (eventImage) {
        formData.append("image", eventImage);
      }
      formData.append("title", updateEvent.title);
      formData.append("date", updateEvent.date);
      formData.append("content", updateEvent.content);

      const response = await axios.put(
        `https://lobster-app-8a4mx.ondigitalocean.app/event/update/${selectedEventId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Check the response status and log the response data
      if (response.status === 200) {
        console.log("Event updated successfully:", response.data);
        fetchData();
        setUpdateEvent({
          title: "",
          date: "",
          content: "",
          image_path: "",
        });
        setEventImage(null);
        setSelectedEventId(null);
      } else {
        console.error("Update request failed with status:", response.status);
        console.error("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <div className="content">
      <Form onSubmit={handleSubmit}>
  <Row>
    <Col md="6">
      <FormGroup>
        <label>Title:</label>
        <Input
          type="text"
          name="title"
          value={newEvent.title}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
    <Col md="6">
      <FormGroup>
        <label>Date:</label>
        <Input
          type="text"
          name="date"
          value={newEvent.date}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="12">
      <FormGroup>
        <label>Content:</label>
        <Input
          type="text"
          name="content"
          value={newEvent.content}
          onChange={handleInputChange}
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="12">
      <FormGroup>
        <label>Image:</label>
        <Input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="12">
      <div className="update ml-auto mr-auto">
        <Button
          className="btn-round"
          color="primary"
          type="submit"
        >
          Add Event
        </Button>
      </div>
    </Col>
  </Row>
</Form>

        <div className="content">
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Event List</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Content</th>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {events.map((event) => (
  <tr key={event.id}>
    <td>{event.title}</td>
    <td>{event.date}</td>
    <td>{event.content}</td>
    <td>
      {event.image_path && (
        <img src={event.image_path} alt={event.image_path} />
      )}
    </td>
    <td>
    <button onClick={() => handleDelete(event.id, event.image_path)}>Delete</button>
    <button onClick={() => handleUpdate(event)}>Update</button>


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
      </div>

      {/* Display the update form when showUpdateForm is true */}
      {showUpdateForm && (
  <div className="content">
    <Form onSubmit={handleEventUpdate}>
      {/* Add your update form fields here */}
      <Row>
        <Col md="6">
          <FormGroup>
            <label>Title:</label>
            <Input
              type="text"
              name="title"
              value={updateEvent.title}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, title: e.target.value })
              }
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label>Date:</label>
            <Input
              type="text"
              name="date"
              value={updateEvent.date}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, date: e.target.value })
              }
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <FormGroup>
            <label>Content:</label>
            <Input
              type="text"
              name="content"
              value={updateEvent.content}
              onChange={(e) =>
                setUpdateEvent({ ...updateEvent, content: e.target.value })
              }
            />
          </FormGroup>
        </Col>
        <Col md="6">
          <FormGroup>
            <label>Image:</label>
            <Input
              type="file"
              name="image"
              onChange={handleImageChange}
            />
          </FormGroup>
        </Col>
      </Row>
      {/* ... Other update form fields ... */}
      <Row>
        <Col md="12">
          <div className="update ml-auto mr-auto">
            <Button className="btn-round" color="primary" type="submit">
              Update Event
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
)}

    </>
  );


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://monkfish-app-wyvrc.ondigitalocean.app/productdetails/getproductdetails");
  //       setProduct(response.data);
  //       console.log(product);
  //     } catch (error) {
  //       console.log(`Error getting news from frontend: ${error}`);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // // useEffect(() => {
  // //   const fetchData = async () => {
  // //     try {
  // //       const response = await axios.get("https://monkfish-app-wyvrc.ondigitalocean.app/blog/data");
  // //       setBlog(response.data);
  // //     } catch (error) {
  // //       console.log(`Error getting Blog from frontend: ${error}`);
  // //     }
  // //   };

  // //   fetchData();
  // // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://monkfish-app-wyvrc.ondigitalocean.app/login/getusers");
  //       setUsers(response.data);
  //     } catch (error) {
  //       console.log(`Error getting Blog from frontend: ${error}`);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://monkfish-app-wyvrc.ondigitalocean.app/orders/getorder");
  //       setOrders(response.data);
  //     } catch (error) {
  //       console.log(`Error getting Blog from frontend: ${error}`);
  //     }
  //   };

  //   fetchData();
  // }, []);

  
  // const handleUpdateClick = () => {
  //   setIsUpdateClicked(true);
  // };
  // return (
  //   <>
  //     <div className="content">
  //       <Row>
  //         <Col lg="3" md="6" sm="6">
  //           <Card className="card-stats">
  //             <CardBody>
  //               <Row>
  //                 <Col md="4" xs="5">
  //                   <div className="icon-big text-center icon-warning">
  //                     <i className="nc-icon nc-globe text-warning" />
  //                   </div>
  //                 </Col>
  //                 <Col md="8" xs="7">
  //                   <div className="numbers">
  //                     <p className="card-category">Events</p>
  //                     <CardTitle tag="p">{product.length}</CardTitle>
  //                     <p />
  //                   </div>
  //                 </Col>

                  
  //               </Row>
  //             </CardBody>
  //             <CardFooter>
  //               <hr />
  //               {/* <div className="stats">
  //                 {isUpdateClicked ? (
  //                   <p className="card-category">Products</p>
  //                 ) : (
  //                   <i className="fas fa-sync-alt" onClick={handleUpdateClick} />
  //                 )}
  //                 <CardTitle tag="p">
  //                   {isUpdateClicked ? product.length : ""}
  //                 </CardTitle>
  //                 <p />
  //               </div> */}
  //             </CardFooter>
  //           </Card>
  //         </Col>
  //         <Col lg="3" md="6" sm="6">
  //           <Card className="card-stats">
  //             <CardBody>
  //               <Row>
  //                 <Col md="4" xs="5">
  //                   <div className="icon-big text-center icon-warning">
  //                     <i className="nc-icon nc-money-coins text-success" />
  //                   </div>
  //                 </Col>
  //                 <Col md="8" xs="7">
  //                   <div className="numbers">
  //                     <p className="card-category">Images</p>
  //                     <CardTitle tag="p">{blog.length}</CardTitle>
  //                     <p />
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </CardBody>
  //             <CardFooter>
  //               <hr />
  //               {/* <div className="stats">
  //                 <i className="far fa-calendar" /> Last day
  //               </div> */}
  //             </CardFooter>
  //           </Card>
  //         </Col>
  //         <Col lg="3" md="6" sm="6">
  //           <Card className="card-stats">
  //             <CardBody>
  //               <Row>
  //                 <Col md="4" xs="5">
  //                   <div className="icon-big text-center icon-warning">
  //                     <i className="nc-icon nc-vector text-danger" />
  //                   </div>
  //                 </Col>
  //                 <Col md="8" xs="7">
  //                   <div className="numbers">
  //                     <p className="card-category">users</p>
  //                     <CardTitle tag="p">{users.length}</CardTitle>
  //                     <p />
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </CardBody>
  //             <CardFooter>
  //               <hr />
  //               {/* <div className="stats">
  //                 <i className="far fa-clock" /> In the last hour
  //               </div> */}
  //             </CardFooter>
  //           </Card>
  //         </Col>
  //         <Col lg="3" md="6" sm="6">
  //           <Card className="card-stats">
  //             <CardBody>
  //               <Row>
  //                 <Col md="4" xs="5">
  //                   <div className="icon-big text-center icon-warning">
  //                     <i className="nc-icon nc-favourite-28 text-primary" />
  //                   </div>
  //                 </Col>
  //                 <Col md="8" xs="7">
  //                   <div className="numbers">
  //                     <p className="card-category">Items in shop</p>
  //                     <CardTitle tag="p">{orders.length}</CardTitle>
  //                     <p />
  //                   </div>
  //                 </Col>
  //               </Row>
  //             </CardBody>
  //             <CardFooter>
  //               <hr />
  //               {/* <div className="stats">
  //                 <i className="fas fa-sync-alt" /> Update now
  //               </div> */}
  //             </CardFooter>
  //           </Card>
  //         </Col>
  //       </Row>
  //       {/* <Row>
  //         <Col md="12">
  //           <Card>
  //             <CardHeader>
  //               <CardTitle tag="h5">Users Behavior</CardTitle>
  //               <p className="card-category">24 Hours performance</p>
  //             </CardHeader>
  //             <CardBody>
  //               <Line
  //                 data={dashboard24HoursPerformanceChart.data}
  //                 options={dashboard24HoursPerformanceChart.options}
  //                 width={400}
  //                 height={100}
  //               />
  //             </CardBody>
  //             <CardFooter>
  //               <hr />
  //               <div className="stats">
  //                 <i className="fa fa-history" /> Updated 3 minutes ago
  //               </div>
  //             </CardFooter>
  //           </Card>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col md="4">
  //           <Card>
  //             <CardHeader>
  //               <CardTitle tag="h5">Email Statistics</CardTitle>
  //               <p className="card-category">Last Campaign Performance</p>
  //             </CardHeader>
  //             <CardBody style={{ height: "266px" }}>
  //               <Pie
  //                 data={dashboardEmailStatisticsChart.data}
  //                 options={dashboardEmailStatisticsChart.options}
  //               />
  //             </CardBody>
  //             <CardFooter>
  //               <div className="legend">
  //                 <i className="fa fa-circle text-primary" /> Opened{" "}
  //                 <i className="fa fa-circle text-warning" /> Read{" "}
  //                 <i className="fa fa-circle text-danger" /> Deleted{" "}
  //                 <i className="fa fa-circle text-gray" /> Unopened
  //               </div>
  //               <hr />
  //               <div className="stats">
  //                 <i className="fa fa-calendar" /> Number of emails sent
  //               </div>
  //             </CardFooter>
  //           </Card>
  //         </Col>
  //         <Col md="8">
  //           <Card className="card-chart">
  //             <CardHeader>
  //               <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
  //               <p className="card-category">Line Chart with Points</p>
  //             </CardHeader>
  //             <CardBody>
  //               <Line
  //                 data={dashboardNASDAQChart.data}
  //                 options={dashboardNASDAQChart.options}
  //                 width={400}
  //                 height={100}
  //               />
  //             </CardBody>
  //             <CardFooter>
  //               <div className="chart-legend">
  //                 <i className="fa fa-circle text-info" /> Tesla Model S{" "}
  //                 <i className="fa fa-circle text-warning" /> BMW 5 Series
  //               </div>
  //               <hr />
  //               <div className="card-stats">
  //                 <i className="fa fa-check" /> Data information certified
  //               </div>
  //             </CardFooter>
  //           </Card>
  //         </Col>
  //       </Row> */}
  //     </div>
  //   </>
  // );
}

export default Dashboard;
