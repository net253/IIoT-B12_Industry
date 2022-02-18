import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  MachineWorkInProcess,
  APC, // Actual Per Hours Chart
  ACPC, // Actual Cumulative Per Hours Chart
} from "../components/machine-report";

export default function MachineReport() {
  return (
    <>
      <Row>
        <Col xs={12} className="pt-2">
          <Row>
            <Col xs={12}>
              <MachineWorkInProcess />
            </Col>
            <Col xs={6}>
              <APC />
            </Col>
            <Col xs={6}>
              <ACPC />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
