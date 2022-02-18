import React from "react";
import { Card, Table, Button } from "react-bootstrap";

export default function TableJobOrder() {
  return (
    <>
      <Card body>
        <Button variant="info" className="m-1">
          All
        </Button>
        <Button variant="info" className="m-1">
          In Process
        </Button>
        <Button variant="info" className="m-1">
          Finished
        </Button>
        <div style={{ height: "40vh", overflow: "auto" }}>
          <Table bordered hover responsive>
            <thead className="thead-dark text-nowrap">
              <tr align="center">
                <th style={{ width: "5%" }}>No</th>
                <th style={{ width: "10%" }}>Action</th>
                <th style={{ width: "15%" }}>Job ID</th>
                <th>Part Name</th>
                <th style={{ width: "10%" }}>Datetime</th>
                <th style={{ width: "5%" }}>Machine</th>
                <th style={{ width: "10%" }}>Actual</th>
                <th style={{ width: "10%" }}>Target</th>
              </tr>
            </thead>
            <tbody className="text-nowrap">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} align="center">
                    <td scope="col">{i + 1}</td>
                    <td>
                      <i
                        className={
                          "fas fa-clipboard-" + (i % 2 ? "list" : "check")
                        }
                      ></i>
                    </td>
                    <td>001810044562</td>
                    <td className="text-left">
                      DB12469400 Drawer rear Left Big RollF
                    </td>
                    <td>01/01/2021 08:00:00</td>
                    <td>A01</td>
                    <td>300</td>
                    <td>1000</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </>
  );
}
