import React from "react";
import { Card } from "reactstrap";

const ChartCard = ({ children, title }) => {
  return (
    <Card
      style={{ width: "auto", margin: "2%" }}
      title={title}
      hoverable="true"
    >
      {children}
    </Card>
  );
};

export default ChartCard;
