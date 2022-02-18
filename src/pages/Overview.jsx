import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Row, Col, Button, Card } from "react-bootstrap";

import { useSelector } from "react-redux";

import BoxMachines from "../components/overview/BoxMachines";

export default function Overview() {
  const allMC = useSelector((state) => state.allMC);

  if (allMC.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <h1>Loading....</h1>
      </div>
    );
  }

  const showArea = ["7", "6", "5", "4", "3", "2", "1"];

  return (
    <>
      <Row>
        <Col xs={12} className="pt-2">
          <Card>
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
              minScale={0.1}
              centerZoomedOut={true}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <Card.Header>
                    <div className="tools">
                      <Button variant="info" onClick={() => zoomOut()}>
                        <i className="fas fa-search-minus" />
                      </Button>
                      <Button variant="info" onClick={() => resetTransform()}>
                        <i className="fas fa-redo-alt" />
                      </Button>
                      <Button variant="info" onClick={() => zoomIn()}>
                        <i className="fas fa-search-plus" />
                      </Button>
                    </div>
                  </Card.Header>

                  <Card.Body className="box-content">
                    <TransformComponent>
                      <div className="py-3">
                        <div className="d-flex py-3">
                          <BoxMachines
                            machieName="multi"
                            machines={allMC.filter(
                              ({ areaNo }) => areaNo === "8"
                            )}
                          />
                          <div className="px-5" />
                          <BoxMachines
                            machieName="cutting"
                            machines={allMC.filter(
                              ({ areaNo }) => areaNo === "9"
                            )}
                          />
                        </div>
                        {showArea.map((num, index) => (
                          <BoxMachines
                            key={index}
                            machieName="bending"
                            machines={allMC.filter(
                              ({ areaNo }) => areaNo === num
                            )}
                          />
                        ))}
                      </div>
                    </TransformComponent>
                  </Card.Body>
                </>
              )}
            </TransformWrapper>
          </Card>
        </Col>
      </Row>
    </>
  );
}
