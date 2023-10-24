import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/system';
import { filter } from 'lodash';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import { useSuccess } from '../SuccessContext';
import { useGetUsersQuery, useDeleteMultipleUserByIdMutation, useBanMultipleUserByIdMutation } from '../redux/userManagement/userManagementApi';

const StyledButton = styled(Button)({
  fontSize: '15px',
  marginTop: (theme) => theme.spacing(2),
});
// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Phone Number', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];
// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function applySortFilter(array, comparator, query) {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return array.filter(
      (_user) =>
        _user &&
        ((_user.fullName && _user.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
          (_user.phoneNumber && _user.phoneNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
          (_user.mobileNumber && _user.mobileNumber.toLowerCase().indexOf(query.toLowerCase()) !== -1))
    );
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [deleteMultipleusers] = useDeleteMultipleUserByIdMutation();
  const [banMultipleUserByIds] = useBanMultipleUserByIdMutation()

  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isSuccessMessageShown, setSuccessMessageShown] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const { showSuccess, setShowSuccess } = useSuccess();
  const [test, setTest] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [suspendedUsers, setSuspendedUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const {
    data: users,
    isFetching,
    refetch,
  } = useGetUsersQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  console.log('full Users:', users);
  const [filteredUsers, setFilteredUsers] = useState(users?.data || []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpen(null);
  };
  const anchorRef = useRef(null);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users?.data?.map((user) => user.name) || [];
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const handleFilterByName = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setPage(0);
    setFilterName(event.target.value);

    // const filtered = users?.data.filter((user) => {
    //   const fullName = user.fullName.toLowerCase();
    //   const phoneNumber = user.mobileNumber.toLowerCase();

    //   return fullName.includes(inputValue) || phoneNumber.includes(inputValue);
    // });

    // setFilteredUsers(filtered);
  };
  // useEffect(() => {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - (users?.data?.length || 0)) : 0;

  useEffect(() => {
    const filtered = applySortFilter(users?.data || [], getComparator(order, orderBy), filterName);
    setFilteredUsers(filtered);
    console.log('word Entered');
  }, [users, order, orderBy, filterName]);

  const isNotFound = !filteredUsers.length && !!filterName;

  // }, [users]);

  useEffect(() => {
    if (showSuccess) {
      toast.success('Form submitted successfully!', {
        autoClose: 3000,
      });
    }
  }, [isSuccessMessageShown]);

  const handleToggleUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  console.log('selected:', selectedUsers);
  if (isFetching) {
    return <div>Loading...</div>;
  }

  const handleDeleteMultiple = async () => {
    try {
      const confirmation = window.confirm('Are you sure you want to delete these Users?');

      if (confirmation) {
        await deleteMultipleusers(selectedUsers);
        toast.success('Users has been Deleted');
        refetch();
      }
    } catch (error) {
      console.log('error');
    }
  };


  const handleBanMultiple = async () => {
    try {
      const confirmation = window.confirm("Are you sure you want to ban these Users?")
      if (confirmation) {
        await banMultipleUserByIds({ userIds: selectedUsers, status: "banned" });
        setSelectedUsers([]);
        toast.success("Selected Users BANNED!")
        refetch();
      }
    } catch (error) {
      console.log('BAN ERROR ===== ', error)
    }
  };


  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            placeholder="Search user..."
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          // onSuspendUsers={handleSuspendUsers}
          // onDeleteUsers={handleDeleteUsers}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={users?.data?.length || 0}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow
                      key={row._id}
                      hover
                      tabIndex={-1}
                      role="none"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        setShowUserDetails(true);
                        navigate(`/userdetails/${row._id}`);
                      }}
                    >
                      <TableCell component="th" scope="row" sx={{ padding: '0px 0px 0px 40px' }}>

                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Checkbox
                            checked={selectedUsers.includes(row._id)}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleUser(row._id);
                            }}
                          />

                          <Avatar
                            sx={{ cursor: 'pointer' }}
                            alt=""
                            src={`http://192.168.18.131:3333/Images/${row?.profileImages
                              ?.find((item) => item?.orderId === 1)
                              ?.uri?.split('/')
                              ?.pop()}`}
                          />
                          <Typography variant="subtitle2" noWrap>
                            {row?.fullName}
                          </Typography>
                        </Stack>

                      </TableCell>
                      <TableCell align="left">{row?.mobileNumber}</TableCell>
                      <TableCell align="left">
                        <Label color={(row?.status === 'banned' && 'error') || 'success'}>{row?.status}</Label>
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={3} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={3} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>
                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          {selectedUsers.length !== 0 && (
            <>
              <StyledButton
                variant="contained"
                color="primary"
                sx={{ marginLeft: 12, marginTop: 6, background: '#4A276B' }}
                onClick={handleDeleteMultiple}
              >
                Delete Selected Users
              </StyledButton>

              <StyledButton
                variant="contained"
                color="primary"
                sx={{ marginLeft: 3, marginTop: 6, background: '#4A276B' }}
                onClick={handleBanMultiple}
              >
                Ban Selected Users
              </StyledButton>
            </>
          )}
        </Card>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users?.data?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      <ToastContainer />
    </>
  );
}
