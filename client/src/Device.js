import React from "react";

function Device({ device }) {
  return (
    <div>
      <span>
        {device.hostname} -- {device.ipAddress} -- {device.model}
      </span>
    </div>
  );
}

export default Device;
