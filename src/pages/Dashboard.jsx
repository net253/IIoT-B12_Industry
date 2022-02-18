import React from "react";
// import NavbarProcess from "../components/NavbarProcess";
// import PieChart from "../components/charts/PieChart";
// import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
// import ProgressBar from "../components/charts/ProgressBar";

// import { Progress } from "semantic-ui-react";
import {
  StatusPie,
  TableJobOrder,
  BarTarget100,
} from "../components/dashboard-process";

export default function Dashboard() {
  return (
    <>
      <Row>
        <Col xs={12} className="pt-2">
          {/* <Card>
            <Card.Body className="box-contentx"> */}
          <Row>
            <Col md={6} xl={4}>
              <StatusPie />
            </Col>
            {/* <ProgressBarAllMachines /> */}
            <Col md={6} xl={8}>
              <BarTarget100 />
            </Col>
            <Col xs={12}>
              <TableJobOrder />
            </Col>
          </Row>
          {/* </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </>
  );
}
