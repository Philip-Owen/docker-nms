import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import { PulseLoader } from "react-spinners";

function Device({ device, pingDevice, deleteDevice }) {
  const [loading, setLoading] = useState(false);
  const ping = async () => {
    setLoading(true);
    await pingDevice(device);
    setLoading(false);
  };
  const del = async () => {
    deleteDevice(device.id);
  };
  return (
    <>
      <TableCell>{device.hostname}</TableCell>
      <TableCell>{device.ipAddress}</TableCell>
      <TableCell>{device.model}</TableCell>
      <TableCell align="center">
        {device.reachability ? (
          <CheckCircleIcon style={{ color: "green" }} />
        ) : (
          <HighlightOffIcon style={{ color: "red" }} />
        )}
      </TableCell>
      <TableCell>
        {device.lastChecked
          ? new Date(device.lastChecked).toLocaleString()
          : null}
      </TableCell>
      <TableCell align="center">
        {loading ? (
          <PulseLoader size={10} />
        ) : (
          <Button variant="outlined" size="small" onClick={ping}>
            Ping
          </Button>
        )}
      </TableCell>
      <TableCell align="center">
        <Button variant="outlined" size="small" color="secondary" onClick={del}>
          Delete
        </Button>
      </TableCell>
    </>
  );
}

export default Device;
