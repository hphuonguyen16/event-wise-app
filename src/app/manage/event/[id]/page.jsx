"use client";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

const Page = () => {
  const link = usePathname();
  const [sales, setSales] = React.useState([]);
  const [recentOrder, setRecentOrder] = React.useState([]);
  return (
    <div
      style={{
        padding: "20px 100px",
      }}
    >
      <Typography variant="h3" gutterBottom my={2}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Tickets Sold" />
            <CardContent>
              <Typography variant="h3">0</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Page Views" />
            <CardContent>
              <Typography variant="h3">0</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom my={2}>
        Share
      </Typography>
      <Typography variant="h6" gutterBottom my={2}>
        Event link
      </Typography>
      <Typography variant="body1" gutterBottom my={2}>
        {link}
      </Typography>
      <Divider />
      <Typography variant="h4" gutterBottom my={2}>
        Sales by ticket type
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ticket type</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.secondary"
                      noWrap
                    >
                      {moment(cryptoOrder.transaction.updatedAt).format(
                        "DD/MM/YYYY"
                      )}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      noWrap
                    >
                      {moment(cryptoOrder.transaction.updatedAt).format(
                        "h:mm:ss A"
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.transaction.transaction_type}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.transaction.amount.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Divider />
      <Typography variant="h4" gutterBottom my={2}>
        Recent Orders
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder.id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.secondary"
                      noWrap
                    >
                      {moment(cryptoOrder.transaction.updatedAt).format(
                        "DD/MM/YYYY"
                      )}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      noWrap
                    >
                      {moment(cryptoOrder.transaction.updatedAt).format(
                        "h:mm:ss A"
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.transaction.transaction_type}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.transaction.amount.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Page;
