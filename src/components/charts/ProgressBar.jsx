import React from "react";
import { Progress } from "semantic-ui-react";

// const increment = () =>
//   this.setState((prevState) => ({
//     percent: prevState.percent >= 100 ? 0 : prevState.percent + 20,
//   }));
// let state = 0;
export default function ProgressBar({ percent }) {
  return (
    <div>
      {/* <div>Bending 1 : ผลิตงานไปแล้ว {state} %</div> */}
      <Progress percent={percent} indicating />
      {/* <Button onClick={increment}>Increment</Button> */}
    </div>
  );
}
