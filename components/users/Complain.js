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
import useUsers from "../../utils/Hooks/useUsers";
import { useMutation } from "react-query";
import { Formik } from "formik";
import userApi from "../../utils/Api/users.api";
import complainApi from "../../utils/Api/complain.api";
import { useAuthToken } from "../../contexts/authContext";
import toast from "react-hot-toast";
import { useQueryClient } from "react-query";
import useComplains from "../../utils/Hooks/useComplain";
import { Select } from "@mui/material";

const ComplainList = () => {
  const { complains, isLoading } = useComplains();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState({});
  const token = useAuthToken();
  const { mutate: editComment, isLoading: isLoading2 } = useMutation({
    mutationKey: ["user_edit"],
    mutationFn: ({ id, data }) => {
      return complainApi.editComplainbyId(id, data, token);
    },
    onSuccess: (data) => {
      toast.success(`Complain edited Successfully`);
      queryClient.invalidateQueries(["getAllComplain"]);
    },
  });
  const { mutate: addNewComplain, isLoading: isLoading4 } = useMutation({
    mutationKey: ["addNewComplain"],
    mutationFn: (data) => complainApi.addNewComplain(data, token),
    onSuccess: (data) => {
      toast.success(`Complain added Successfully`);
      queryClient.invalidateQueries(["getAllComplain"]);
    },
  });

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      editComment({
        id: values.id,
        data: {
          message: values.message,
        },
      });
      //send/receive api updates here, then refetch or update local table data for re-render
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

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
        accessorKey: "ComplainCatagory",
        header: "Complain Catagory",
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
    ],
    []
  );

  return (
    <>
      <div className="main-content d-flex flex-column">
        <MaterialReactTable
          state={{
            isLoading: isLoading || isLoading2 || isLoading4,
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
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              color="secondary"
              onClick={() => setCreateModalOpen(true)}
              variant="contained"
            >
              Create New Account
            </Button>
          )}
        />
        <CreateNewAccountModal
          columns={columns}
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onSubmit={handleCreateNewRow}
          addNewUser={addNewComplain}
        />
      </div>
    </>
  );
};
const newUserDataValidation = yup.object().shape({
  message: yup.string().min(10),
});

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, onClose, addNewUser }) => {
  const handleSubmit = (values) => {
    if (values.email === "") {
      addNewUser({ ...values, email: undefined });
    } else {
      addNewUser(values);
    }
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Complain</DialogTitle>
      <DialogContent>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            message: "",
            ComplainCatagory: "ELECTRICAL",
          }}
          validationSchema={newUserDataValidation}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
            <form onSubmit={handleSubmit} id="myform">
              <Stack
                sx={{
                  width: "100%",
                  padding: ".5rem",
                  minWidth: { xs: "300px", sm: "360px", md: "400px" },
                  gap: "1.5rem",
                }}
              >
                {[{ id: "message", title: "Message" }].map(({ id, title }) => (
                  <TextField
                    key={id}
                    error={errors[id]}
                    label={errors[id] ?? title}
                    name={id}
                    onChange={handleChange}
                    value={values[id]}
                  />
                ))}
                <Select
                  label="ComplainCatagory"
                  name="ComplainCatagory"
                  value={values.ComplainCatagory}
                  onChange={handleChange}
                >
                  <MenuItem value="ELECTRICAL">ELECTRICAL</MenuItem>
                  <MenuItem value="PLUMBING">PLUMBING</MenuItem>
                  <MenuItem value="SNITARY">SNITARY</MenuItem>
                </Select>
              </Stack>
            </form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          color="secondary"
          form="myform"
          variant="contained"
        >
          Create New Complain
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ComplainList;
