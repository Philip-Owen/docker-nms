import React from "react";
import TableCell from "@material-ui/core/TableCell";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import styled from "styled-components";

function Device({ device }) {
  return (
    <>
      <TableCell>{device.hostname}</TableCell>
      <TableCell>{device.ipAddress}</TableCell>
      <TableCell>{device.model}</TableCell>
      <TableCell>
        {device.reachability ? (
          <CheckCircleIcon style={{ color: "green" }} />
        ) : (
          <HighlightOffIcon style={{ color: "red" }} />
        )}
      </TableCell>
    </>
  );
}

export default Device;
