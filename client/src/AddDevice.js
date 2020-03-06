import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
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
    console.log("ran");
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
      <h1>Add A Device</h1>
      {error !== null ? <h3>{error}</h3> : null}
      {success ? <h3>Device Added</h3> : null}
      <DeviceForm onSubmit={handleSubmit}>
        <FormGroupStyled>
          <TextField
            required
            type="text"
            placeholder="Hostname"
            name="hostname"
            value={device.hostname}
            onChange={handleChange}
          />
          <TextField
            required
            type="text"
            placeholder="IP Address"
            name="ipAddress"
            value={device.ipAddress}
            onChange={handleChange}
          />
          <TextField
            type="text"
            placeholder="Model"
            name="model"
            value={device.model}
            onChange={handleChange}
          />
        </FormGroupStyled>
        <Button variant="contained">Add Device</Button>
      </DeviceForm>
    </div>
  );
}

const DeviceForm = styled.form`
  width: 400px;
`;

const FormGroupStyled = styled(FormGroup)`
  margin: 25px;
  width: 400px;
  * {
    margin: 10px 0;
  }
`;

export default AddDevice;
