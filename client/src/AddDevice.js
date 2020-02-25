import React, { useState } from "react";
import styled from "styled-components";

const initialDeviceState = {
  hostname: "",
  ipAddress: "",
  model: ""
};

function AddDevice() {
  const [device, setDevice] = useState(initialDeviceState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = e => {
    setSuccess(false);
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("/api/devices", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(device)
    });
    if (res.status !== 400) {
      console.log(res);
      setError(null);
      setDevice(initialDeviceState);
      setSuccess(true);
    } else {
      const err = await res.json();
      console.log(err);
      setError(err.error);
    }
  };
  return (
    <div>
      {error !== null ? <h3>{error}</h3> : null}
      {success ? <h3>Device Added</h3> : null}
      <DeviceForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Hostname"
          name="hostname"
          value={device.hostname}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="IP Address"
          name="ipAddress"
          value={device.ipAddress}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Model"
          name="model"
          value={device.model}
          onChange={handleChange}
        />
        <button>Add Device</button>
      </DeviceForm>
    </div>
  );
}

const DeviceForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
`;

export default AddDevice;
