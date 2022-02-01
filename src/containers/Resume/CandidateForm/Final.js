import React from "react";
import { Card, Button } from "react-bootstrap";

const Final = ({ values, nextStep, prevStep }) => {

    //destructuring the object from values
  const { firstName, lastName, employer, email } = values;
  return (
    <>
      <Card style={{ marginTop: 100, textAlign: "left" }}>
        <Card.Body>
          <p>
            <strong>First Name :</strong> {firstName}{" "}
          </p>
          <p>
            <strong>Last Name :</strong> {lastName}{" "}
          </p>
          <p>
            <strong>Age :</strong> {employer}{" "}
          </p>
          <p>
            <strong>Email :</strong> {email}{" "}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button className= "btn btn-gradient-primary mt-4 mb-2" type="submit" onClick={prevStep} >
                Previous
              </Button>

              <Button className= "btn btn-gradient-primary mt-4 mb-2" onClick={nextStep} type="submit" >
                Next
              </Button>
            </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Final;