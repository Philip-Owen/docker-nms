import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Device from "./Device";

function Devices() {
  const [deviceList, setDeviceList] = useState([]);

  const pingDevice = async device => {
    const res = await fetch(`/api/ping/${device.ipAddress}`);
    getSingleDevice(device.id);
  };
  const getDevices = async () => {
    const res = await fetch("/api/devices");
    const data = await res.json();
    setDeviceList(data);
  };
  const getSingleDevice = async id => {
    const res = await fetch(`/api/devices/${id}`);
    const data = await res.json();
    setDeviceList(d => {
      if (d.id === id) {
        return { ...data[0] };
      }
      return d;
    });
  };
  useEffect(() => {
    getDevices();
  }, []);
  return (
    <div>
      <h2>Device List</h2>
      <TableContainer>
        <DeviceTable>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Hostname</b>
              </TableCell>
              <TableCell>
                <b>IP Address</b>
              </TableCell>
              <TableCell>
                <b>Model</b>
              </TableCell>
              <TableCell align="center">
                <b>Reachability</b>
              </TableCell>
              <TableCell>
                <b>Last Checked</b>
              </TableCell>
              <TableCell align="center">
                <b>Test</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceList.length > 0
              ? deviceList.map(d => (
                  <TableRow key={d.id} style={{ height: 63 }}>
                    <Device device={d} pingDevice={pingDevice} />
                  </TableRow>
                ))
              : null}
          </TableBody>
        </DeviceTable>
      </TableContainer>
    </div>
  );
}

const DeviceTable = styled(Table)`
  max-width: 850px;
`;

const HeadCell = styled(TableCell)`
  font-weight: bold;
`;

export default Devices;
