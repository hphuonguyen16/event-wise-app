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
  Stack,
  Box,
} from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import { useEffect } from "react";
import moment from "moment";
import Link from "next/link";

const Page = ({ params }) => {
  const link = usePathname();
  const [sales, setSales] = React.useState([]);
  const [recentOrder, setRecentOrder] = React.useState([]);
  const [data, setData] = React.useState();
  const axiosPrivate = useAxiosPrivate();

  const fetchEventOverview = async () => {
    try {
      const response = await axiosPrivate.get(
        UrlConfig.event.getEventOverview(params.id)
      );
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchEventOverview();
  }, []);

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
              <Typography variant="h3">
                {data?.soldTickets}/{data?.totalTickets}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Revenue" />
            <CardContent>
              <Typography variant="h3">
                {data?.revenue.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
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
      <Typography variant="body1" gutterBottom my={2} sx={{ color: "blue" }}>
        <Link href={link} target="_blank">
          {window.location.href}
        </Link>
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
              <TableCell>Sold</TableCell>
              <TableCell align="right">Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.salesByTicketType.map((ticket) => {
              return (
                <TableRow hover key={ticket.name}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.secondary"
                      noWrap
                    >
                      {ticket.name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      noWrap
                    >
                      {ticket.discountPrice &&
                      ticket.discountPrice < ticket.price ? (
                        <>
                          <span style={{ textDecoration: "line-through" }}>
                            {ticket.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                          <span style={{ color: "red", marginLeft: "10px" }}>
                            {ticket.discountPrice.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </>
                      ) : ticket?.price != null ? (
                        ticket.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })
                      ) : (
                        "N/A"
                      )}
                    </Typography>

                    {ticket?.tier && (
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ marginTop: "5px" }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            bgcolor: ticket?.tier?.color,
                          }}
                        ></Box>
                        <Typography variant="subtitle2" noWrap>
                          {ticket?.tier?.name}
                        </Typography>
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {ticket.sold}/{ticket.quantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {ticket.revenue.toLocaleString("vi", {
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
            {data?.recentRegistrations?.map((cryptoOrder) => {
              return (
                <TableRow hover key={cryptoOrder._id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.secondary"
                      noWrap
                    >
                      {cryptoOrder._id}
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
                      {cryptoOrder.user
                        ? cryptoOrder?.user?.profile?.name
                        : cryptoOrder.contactInfo
                        ? cryptoOrder.contactInfo.firstName +
                          " " +
                          cryptoOrder.contactInfo.lastName
                        : ""}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder?.totalQuantity}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder?.totalAmount?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {moment(cryptoOrder?.registrationDate).format(
                        "DD/MM/YYYY"
                      )}
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
