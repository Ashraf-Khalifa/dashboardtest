/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

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

function Orders() {
    //modify the variable $ route based on db
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role_id, setRole_id] = useState("");
 
  const [add, setAdd] = useState([]);

  const [del, setDel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //modify route
        const response = await axios.get("https://monkfish-app-wyvrc.ondigitalocean.app/product/get");
        setAdd(response.data);
      } catch (error) {
        console.log(`Error getting news from frontend: ${error}`);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id, index) => {
    try {
                 //modify route
      const response = await axios.delete(
        `https://monkfish-app-wyvrc.ondigitalocean.app/product/delete/${id}`
      );
      console.log(id);
      console.log(response);

      setAdd((prevUser) =>
      prevUser.filter((user) => user.id !== id)
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
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Orders Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>order</th>
                        <th>note</th>
                        <th>role_id</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {add &&
                      Array.isArray(add) &&
                      add.map((user,index) => (
                        <tbody key={user.id}>
                          <tr >
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role_id}</td>
                            
                            <td>
                              <button
                                 onClick={() =>
                                    handleDelete(user.id,index) // Calling handleDelete with the product's _id and index
                                  }
                              >
                                delete
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
    </>
  );
}

export default Orders;
