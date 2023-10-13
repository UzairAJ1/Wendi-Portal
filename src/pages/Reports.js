import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument, rgb } from 'pdf-lib';
import {
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  Container,
  TablePagination,
  Box,
} from '@mui/material';
import { useGetUserByTimeQuery, useGetLikesByTimeQuery } from '../redux/dashboard/dashboardApi';

const tabs = {
  users: ['monthly', 'weekly', 'yearly', 'total'],
  likes: ['monthly', 'weekly', 'yearly', 'total'],
  gender: ['monthly', 'weekly', 'yearly', 'total'],
};

const Reports = () => {
  const { data: usersData, isFetching: fetchingUserStats, error1 } = useGetUserByTimeQuery();
  const { data: likesData, isFetching: fetchingLikesStats, error2 } = useGetLikesByTimeQuery();

  const [monthlyUsers, setMonthlyUser] = useState([]);
  const [weeklyUsers, setWeeklyUsers] = useState([]);
  const [yearlyUsers, setyearlyUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);

  const [monthlyLikes, setMonthlyLikes] = useState([]);
  const [weeklyLikes, setWeeklyLikes] = useState([]);
  const [yearlyLikes, setYearlyLikes] = useState([]);
  const [totalLikes, setTotalLikes] = useState([]);

  const [monthlyGenders, setMonthlyGenders] = useState([]);
  const [weeklyGenders, setWeeklyGenders] = useState([]);
  const [yearlyGenders, setYearlyGenders] = useState([]);
  const [totalGenders, setTotalGenders] = useState([]);

  useEffect(() => {
    setMonthlyUser(usersData?.usersMonthly || []);
    setWeeklyUsers(usersData?.usersWeekly || []);
    setyearlyUsers(usersData?.usersYearly || []);
    setTotalUsers(usersData?.usersTotal || []);
  }, [usersData]);

  useEffect(() => {
    setMonthlyLikes(likesData?.likesMonthly || []);
    setWeeklyLikes(likesData?.likesWeekly || []);
    setYearlyLikes(likesData?.likesYearly || []);
    setTotalLikes(likesData?.likesTotal || []);
  }, [likesData]);

  useEffect(() => {
    setMonthlyGenders(usersData?.gendersMonthly || []);
    setWeeklyGenders(usersData?.gendersWeekly || []);
    setYearlyGenders(usersData?.gendersYearly || []);
    setTotalGenders(usersData?.gendersTotal || []);
  }, [usersData]);

  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('users');
  const [activeTab, setActiveTab] = useState('monthly');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tableRef = useRef(null);
  // useEffect(() => {
  //   console.log('selectedOption : ', selectedOption);
  // }, [selectedOption]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rowsPerPage
  };

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
    setPage(0); // Reset to the first page when changing tabs
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleExportClick = async () => {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([600, 400]);

    const content = tableData[selectedOption][activeTab]
      .slice(startIndex, endIndex)
      .map((user) => {
        const sanitizedText = new TextEncoder().encode(user.fullName).reduce((str, charCode) => {
          if (charCode >= 32 && charCode <= 126) {
            // Filter out non-printable ASCII characters
            return str + String.fromCharCode(charCode);
          }
          return str;
        }, '');
        return `${user._id} | ${sanitizedText} | ${user.mobileNumber}`;
      })
      .join('\n');

    page.drawText(`${selectedOption}-${activeTab}-report`, {
      x: 50,
      y: 370,
      size: 16,
      color: rgb(0, 0, 0),
    });

    page.drawText(content, {
      x: 50,
      y: 350,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedOption}-${activeTab}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const tableData = {
    users: {
      monthly: monthlyUsers,
      weekly: weeklyUsers,
      yearly: yearlyUsers,
      total: totalUsers,
    },
    likes: {
      monthly: monthlyLikes,
      weekly: weeklyLikes,
      yearly: yearlyLikes,
      total: totalLikes,
    },
    gender: {
      monthly: [monthlyGenders],
      weekly: [weeklyGenders],
      yearly: [yearlyGenders],
      total: [totalGenders],
    },
  };
  console.log('MonthlyUsers :', monthlyUsers);
  console.log('MonthlyGenders :', monthlyGenders);
  return (
    <Container sx={{ marginTop: '40px' }}>
      <Select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} sx={{ marginBottom: '20px' }}>
        <MenuItem value="users">Users</MenuItem>
        <MenuItem value="likes">Likes</MenuItem>
        <MenuItem value="gender">Gender</MenuItem>
      </Select>
      <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {tabs[selectedOption].map((tab) => (
          <Tab key={tab} value={tab} label={tab} />
        ))}
      </Tabs>
      <TableContainer component={Paper}>
        {selectedOption === 'users' && (
          <Table ref={tableRef}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>MobileNumber</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData[selectedOption][activeTab].slice(startIndex, endIndex).map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {selectedOption === 'likes' && (
          <Table ref={tableRef}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Liker ID</TableCell>
                <TableCell>Liked ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData[selectedOption][activeTab].slice(startIndex, endIndex).map((likes) => (
                <TableRow key={likes?._id}>
                  <TableCell>{likes?._id}</TableCell>
                  <TableCell>{likes?.likerUserId?.fullName}</TableCell>
                  <TableCell>{likes?.likedUserId?.fullName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {selectedOption === 'gender' && (
          <Table ref={tableRef}>
            <TableHead>
              <TableRow>
                <TableCell>Males</TableCell>
                <TableCell>Females</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData[selectedOption][activeTab].slice(startIndex, endIndex).map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.male}</TableCell>
                  <TableCell>{user.female}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData[selectedOption][activeTab].length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box sx={{ margin: '40px 0' }}>
        <Button
          variant="contained"
          sx={{ background: '#4A276B' }}
          onClick={() => {
            navigate('/dashboard/reportandanalytics');
          }}
        >
          Back to Report and analytics
        </Button>
        <Button variant="contained" sx={{ background: '#4A276B', marginLeft: '20px' }} onClick={handleExportClick}>
          Export
        </Button>
      </Box>
    </Container>
  );
};

export default Reports;
