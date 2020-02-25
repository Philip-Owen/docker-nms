import React, { useState, useEffect } from "react";

import Device from "./Device";

function Devices() {
  const [deviceList, setDeviceList] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await fetch("/api/devices");
      const data = await res.json();
      setDeviceList(data);
    }
    getData();
  }, []);
  return (
    <div>
      {deviceList.length > 0
        ? deviceList.map(d => <Device key={d.id} device={d} />)
        : null}
    </div>
  );
}

export default Devices;
