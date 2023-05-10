import React, { useCallback, useMemo, useState } from "react";
import * as yup from "yup";
import MaterialReactTable from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useMutation } from "react-query";
import { Formik } from "formik";
import userApi from "../../utils/Api/users.api";
import complainApi from "../../utils/Api/complain.api";
import { useAuthToken } from "../../contexts/authContext";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import useComplains from "../../utils/Hooks/useComplain";

const ComplainListAdmin = () => {
  const { complains, isLoading } = useComplains();
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState({});
  const token = useAuthToken();
  const { mutate: editComplain, isLoading: isLoading2 } = useMutation({
    mutationKey: ["editComplain"],
    mutationFn: ({ id, data }) => {
      return complainApi.editComplainbyId(id, data, token);
    },
    onSuccess: (data) => {
      toast.success(`Cmplain edited Successfully`);
      queryClient.invalidateQueries(["getAllComplain"]);
    },
  });

  const { mutate: deleteComplainById, isLoading: isLoading3 } = useMutation({
    mutationKey: ["deleteComplainById"],
    mutationFn: (id) => {
      return complainApi.deleteComplainById(id, token);
    },
    onSuccess: () => {
      toast.success(`Complain deleted Successfully`);
      queryClient.invalidateQueries(["getAllComplain"]);
      refetch();
    },
  });

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      editComplain({
        id: values.id,
        data: {
          message: values.message,
          state: values.state,
        },
      });
      //send/receive api updates here, then refetch or update local table data for re-render
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const handleDeleteRow = useCallback(
    (row) => {
      if (!confirm(`Are you sure you want to delete ${row.getValue("id")}`)) {
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render
      deleteComplainById(row.getValue("id"));
    },
    [deleteComplainById]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableSorting: false,
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "user.name",
        header: "Name",
        size: 140,
        enableEditing: false,
      },
      {
        accessorKey: "user.phoneNo",
        header: "Phone No",
        size: 140,
        enableEditing: false,
      },
      {
        accessorKey: "message",
        header: "Message",
        enableEditing: true, //disable editing on this column
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        enableEditing: false,
      },
      {
        accessorKey: "ComplainCatagory",
        header: "Complain Catagory",
        enableEditing: false,
      },
      {
        accessorKey: "state",
        header: "State",
        enableEditing: true,
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: ["CREATED", "RESOLVED"].map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          )),
        },
      },
    ],
    []
  );

  return (
    <>
      <div className="main-content d-flex flex-column">
        <MaterialReactTable
          state={{
            isLoading: isLoading || isLoading2 || isLoading3,
          }}
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={complains}
          editingMode="modal" //default
          enableColumnOrdering
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow placement="right" title="Delete">
                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        />
      </div>
    </>
  );
};

export default ComplainListAdmin;
