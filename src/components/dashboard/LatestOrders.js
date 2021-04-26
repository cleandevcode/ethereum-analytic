import React, { useState } from 'react';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { tokens } from '../../transaction';

const LatestOrders = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    console.log('new page--->', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card {...props}>
      <CardHeader title="Latest Orders" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Paper className="w-100">
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Symbol</TableCell>
                    <TableCell>Decimals</TableCell>
                    <TableCell>Total Supply</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Block Number</TableCell>
                    <TableCell>Block Hash</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tokens
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order) => (
                      <TableRow hover key={order.address}>
                        <TableCell>{order.address}</TableCell>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>{order.symbol}</TableCell>
                        <TableCell>{order.decimals}</TableCell>
                        <TableCell>{order.total_supply}</TableCell>
                        <TableCell>
                          {moment(order.block_timestamp).format('DD/MM/YYYY')}
                        </TableCell>
                        <TableCell>{order.block_number}</TableCell>
                        <TableCell>{order.block_hash}</TableCell>
                        {/* <TableCell>
                    <Chip color="primary" label={order.status} size="small" />
                  </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tokens.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default LatestOrders;
