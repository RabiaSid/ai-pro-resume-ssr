// src/components/DataTable.js
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

const DataTable = ({ columns, data, onEdit, onDelete, onView }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
            <TableCell>Actions</TableCell> {/* Additional column for actions */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.field}>{row[column.field]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => onEdit(row.id)} aria-label="edit">
                  Edit
                </IconButton>
                <IconButton
                  onClick={() => onDelete(row.id)}
                  aria-label="delete"
                >
                  Delete
                </IconButton>
                <IconButton onClick={() => onView(row.id)} aria-label="view">
                  Show
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
