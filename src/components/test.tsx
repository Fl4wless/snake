import React from "react";

const Test: React.FC = () => {
  React.useEffect(() => {
    setInterval(() => {
      console.log("tick");
    }, 3000);
  }, []);

  return <div>Test</div>;
};

export default Test;
