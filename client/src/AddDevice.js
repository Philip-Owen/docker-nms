import React, { useState } from "react";
import { api } from "./api_conf";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import styled from "styled-components";

const initialDeviceState = {
  hostname: "",
  ipAddress: "",
  model: "",
};

function AddDevice() {
  const [device, setDevice] = useState(initialDeviceState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setSuccess(false);
    const { name, value } = e.target;
    setDevice({ ...device, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${api}/api/devices`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
    });
    if (res.status === 201) {
      setError(null);
      setDevice(initialDeviceState);
      setSuccess(true);
    } else {
      if (res.status === 500) {
        setError(handleError(null));
      } else {
        const err = await res.json();
        setError(handleError(err.error));
      }
    }
  };
  const handleError = (error) => {
    switch (error) {
      case "ipAddress must be unique":
        return `A device with the IP address "${device.ipAddress}" is already in monitoring.`;
      case "hostname must be unique":
        return `A device with the hostname "${device.hostname}" is already in monitoring.`;
      default:
        return "Internal Server Error. Please verify that the server and database are running.";
    }
  };
  return (
    <div>
      <h1>Add A Device</h1>
      {error !== null ? <h3 style={{ color: "red" }}>{error}</h3> : null}
      {success ? <h3>Device Added</h3> : null}
      <DeviceForm onSubmit={handleSubmit}>
        <FormGroupStyled>
          <TextField
            required
            variant="outlined"
            size="small"
            type="text"
            placeholder="Hostname"
            name="hostname"
            value={device.hostname}
            onChange={handleChange}
          />
          <TextField
            required
            variant="outlined"
            size="small"
            type="text"
            placeholder="IP Address"
            name="ipAddress"
            value={device.ipAddress}
            onChange={handleChange}
          />
          <TextField
            type="text"
            variant="outlined"
            size="small"
            placeholder="Model (Optional)"
            name="model"
            value={device.model}
            onChange={handleChange}
          />
        </FormGroupStyled>
        <Button type="submit" variant="contained">
          Add Device
        </Button>
      </DeviceForm>
    </div>
  );
}

const DeviceForm = styled.form`
  width: 400px;
`;

const FormGroupStyled = styled(FormGroup)`
  width: 400px;
  * {
    margin: 10px 0;
  }
`;

export default AddDevice;
