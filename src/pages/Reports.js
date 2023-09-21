import React, { useState, useRef } from 'react';
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

const tableData = {
  users: {
    monthly: [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' },
      { id: 11, name: 'User 1', email: 'user1@example.com' },
      { id: 12, name: 'User 2', email: 'user2@example.com' },
      { id: 42, name: 'User 2', email: 'user2@example.com' },
      { id: 41, name: 'User 1', email: 'user1@example.com' },
      { id: 52, name: 'User 2', email: 'user2@example.com' },
    ],
    weekly: [
      { id: 3, name: 'User 3', email: 'user3@example.com' },
      { id: 4, name: 'User 4', email: 'user4@example.com' },
    ],
    yearly: [
      { id: 5, name: 'User 5', email: 'user5@example.com' },
      { id: 6, name: 'User 6', email: 'user6@example.com' },
    ],
    total: [
      { id: 7, name: 'User 7', email: 'user7@example.com' },
      { id: 8, name: 'User 8', email: 'user8@example.com' },
    ],
  },
  likes: {
    monthly: [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' },
    ],
    weekly: [
      { id: 3, name: 'User 3', email: 'user3@example.com' },
      { id: 4, name: 'User 4', email: 'user4@example.com' },
    ],
    yearly: [
      { id: 5, name: 'User 5', email: 'user5@example.com' },
      { id: 6, name: 'User 6', email: 'user6@example.com' },
    ],
    total: [
      { id: 7, name: 'User 7', email: 'user7@example.com' },
      { id: 8, name: 'User 8', email: 'user8@example.com' },
    ],
  },
  gender: {
    monthly: [
      { id: 1, name: 'User 1', email: 'user1@example.com' },
      { id: 2, name: 'User 2', email: 'user2@example.com' },
    ],
    weekly: [
      { id: 3, name: 'User 3', email: 'user3@example.com' },
      { id: 4, name: 'User 4', email: 'user4@example.com' },
    ],
    yearly: [
      { id: 5, name: 'User 5', email: 'user5@example.com' },
      { id: 6, name: 'User 6', email: 'user6@example.com' },
    ],
    total: [
      { id: 7, name: 'User 7', email: 'user7@example.com' },
      { id: 8, name: 'User 8', email: 'user8@example.com' },
    ],
  },
};

const tabs = {
  users: ['monthly', 'weekly', 'yearly', 'total'],
  likes: ['monthly', 'weekly', 'yearly', 'total'],
  gender: ['monthly', 'weekly', 'yearly', 'total'],
};

const Reports = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('users');
  const [activeTab, setActiveTab] = useState('monthly');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tableRef = useRef(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const handleExportClick = async () => {
    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([600, 400]);

    const content = tableData[selectedOption][activeTab]
      .slice(startIndex, endIndex)
      .map((user) => `${user.id} | ${user.name} | ${user.email}`)
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
        <Table ref={tableRef}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData[selectedOption][activeTab].slice(startIndex, endIndex).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
