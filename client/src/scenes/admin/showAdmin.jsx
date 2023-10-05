import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  useTheme,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";
import Header from "components/Header";
import Addbutton from "components/Addbutton";
import { DataGrid } from "@mui/x-data-grid";
import { getAllAdmin, changeRole } from "state/function/users";
import { DeleteUser } from "state/function/users";
import { useGetCustomersQuery } from "state/api";
import Swal from "sweetalert2";
import { http } from 'utils'


const ShowAdmin = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [adminData, setAdminData] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const { isLoading } = useGetCustomersQuery();

  const handleAdd = () => {
    navigate("/admin/addadmin");
  };


  useEffect(() => {

    fetchData();

  }, []);

  const fetchData = async () => {
    try {
      const data = await getAllAdmin();
      if (data) {
        setAdminData(data);
      } else {
        console.error("Data from API is undefined");
      }
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  const role = ['admin', 'editor'];


  const handleChangeRole = async (id, e) => {
    const value = {
      id: id,
      role: e.target.value
    };
    await changeRole(user.token, value)

      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error)
      })
  }


  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this user!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await DeleteUser(id, user.token);
          setAdminData((prevData) => prevData.filter((user) => user._id !== id));
          Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        }
      });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };




  const getRowId = (row) => row._id;


  const columns = [
    {
      field: "image",
      headerName: "Image",
      flex: 0.5,
      renderCell: (params) => (
        <Box >
          <img src={params.row.avatarUrl} alt="Profile" style={{ width: "40px", height: "36px", borderRadius: "50%" }} />
        </Box>
      ),
    },
    {
      field: "firstname",
      headerName: "Firstname",
      flex: 1,
    },
    {
      field: "lastname",
      headerName: "Lastname",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex" }}>
          <Select
            sx={{ width: "100px", height: "35px" }}
            value={params.row.role}
            onChange={(e) => handleChangeRole(params.row._id, e)}>
            {role.map((item) =>
              <MenuItem key={item} value={item}>{item}</MenuItem>
            )}
          </Select>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params.row._id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="Admin2" subtitle="List of Customers" />
        <Addbutton onClick={handleAdd} />
      </Box>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.base,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !adminData}
          columns={columns}
          rows={adminData}
          getRowId={getRowId}
        />
      </Box>
    </Box>
  );
};

export default ShowAdmin;
