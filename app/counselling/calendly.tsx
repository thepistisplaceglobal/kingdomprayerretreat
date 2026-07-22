"use client";

import { InlineWidget } from "react-calendly";

const Calendly = () => {
  return (
    <div className="w-full ">
      <InlineWidget
        styles={{ height: "850px" }}
        url="https://calendly.com/thepistisplaceprotocol/30min"
        pageSettings={{
          primaryColor: "300460",
        }}
      />
    </div>
  );
};

export default Calendly;
