import React from "react";
import { Card } from "react-bootstrap";

const BoxMachine = ({ machines }) => {
  return (
    <div className="d-flex overflow-auto pb-1">
      {Array(machines)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="pt-5 px-2">
            <div
              className="box-machine"
              onClick={() => alert('Active Event "onClick"')}
            >
              {/* <div className="box-profile"></div> */}
              <img
                src={`images/machines/bending.png`}
                className="img-fluid w-75"
              />
              {/* blink_status */}
              <div className="w-75 badge bg-success">Online</div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default function MachineWorkInProcess() {
  return (
    <>
      <Card body>
        <BoxMachine machines={10} />
      </Card>
    </>
  );
}
