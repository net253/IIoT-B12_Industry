import React from "react";

export default function Preloader() {
  return (
    <div className="preloader flex-column justify-content-center align-items-center">
      {/* <img
        className="animation__wobble"
        src="images/ai.png"
        alt="AdminLTELogo"
        height={60}
        width={60}
      /> */}
      <div className="animation__wobble mb-3">
        <h1>Development by ARAI Programmer</h1>
        <ol className="h4">
          <li>Sarocha Boonload (Back-end)</li>
          <li>Chatchai Panthip (Front-end)</li>
          <li>Sataporn Chaijaroen (Full stack)</li>
        </ol>
      </div>
      <small>(Press F5 for reload)</small>
    </div>
  );
}
