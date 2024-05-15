"use client";
import {
  Typography,
  Box,
  Paper,
  MenuList,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, {useEffect, useState } from "react";
import Link from "next/link";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import { styled } from "@mui/material/styles";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import moment from "moment";

// Define StyledLinkBox with conditional styles
const StyledLinkBox = styled("div")((props) => ({
  // width: '100%',
  // padding: '15px 0',
  // opacity: 0.7,
  // '& a': {
  //   textDecoration: 'none',
  //   display: 'flex',
  //   alignItems: 'center'
  // },
  // transition: 'background-color 0.3s ease-in-out', // Smooth background color transition on hover
  // '&:hover': {
  //   backdropFilter: 'blur(4px)', // Use 'backdropFilter' with a CSS value
  //   boxShadow: '-2px 5px 13px rgba(0, 0, 0, 0.06)',
  //   opacity: 0.9,
  //   transition: 'background-color 0.3s ease-in-out' // Smooth background color transition on hover
  // },
  // Conditional styles based on isActive
  ...(props.isActive && {
    backdropFilter: "blur(4px)",
    boxShadow: "-2px 5px 8px rgba(0, 0, 0, 0.06)",
    transition: "background-color 0.5s ease-in-out",
    opacity: 1,
    backgroundColor: "#f5f5f5",
  }),
}));

function getStatusIcon(status) {
  if (
    status === "building" ||
    status === "ticketing" ||
    status === "published"
  ) {
    return <CheckCircleIcon sx={{ fontSize: "25px" }} />;
  } else {
    return (
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      >
        {status === "building"
          ? "1"
          : status === "ticketing"
          ? "2"
          : status === "published"
          ? "3"
          : ""}
      </div>
    );
  }
}

const Layout = ({ children }) => {
  const router = useRouter();
  const axiosPrivate = useAxiosPrivate();
  const pathname = usePathname();
  const id = useParams().id;
  const [event, setEvent] = useState();

  const isLinkActive = (href) => {
    return pathname === href;
  };

  const fetchDetailEvent = async () => {
    const response = await axiosPrivate.get(
      UrlConfig.event.getEvent(id)
    );
    const event = response.data.data.data;
    console.log("event", event);
    setEvent(event);
  };

  console.log("event", event);

  useEffect(() => {
    fetchDetailEvent();
  }, [id]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "20%", height: "100vh", overflowY: "auto" }}>
        <Box sx={{ marginBottom: "40px" }}>
          <FormControl sx={{ width: "60%" }}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              // label="Age"
              // onChange={handleChange}
              defaultValue={"On sale"}
              sx={{
                height: "40px",
                borderRadius: "20px",
                marginBottom: "20px",
              }}
            >
              <MenuItem value={"On sale"}>On sale</MenuItem>
              <MenuItem value={20}>Change event status</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            {event?.title}
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", marginBottom: "15px" }}
          >
            {moment(event?.start_date).format("MMM DD, YYYY")} {" at "}
            {event?.startTime ? moment(event?.startTime).format("hh:mm A") : ""}
            {" - "}
            {event?.endTime ? moment(event?.endTime).format("hh:mm A") : ""}
          </Typography>
          <Link href={`/event/${id}`}>
            {" "}
            <Typography sx={{ color: "blue" }} variant="subtitle">
              View your event page{" "}
            </Typography>
          </Link>
        </Box>
        <Divider sx={{ marginTop: "10px" }} />
        <Paper sx={{ marginTop: "20px" }}>
          <MenuList>
            <StyledLinkBox isActive={pathname.includes("/detail")}>
              <Link href={`/manage/event/${id}/detail`}>
                <MenuItem sx={{ padding: "25px", fontWeight: "bold" }}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ fontSize: "25px" }} />
                  </ListItemIcon>
                  Build Event Page
                </MenuItem>
              </Link>
            </StyledLinkBox>
            <StyledLinkBox isActive={pathname.includes("/ticket")}>
              <Link href={`/manage/event/${id}/ticket`}>
                <MenuItem sx={{ padding: "25px", fontWeight: "bold" }}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ fontSize: "25px" }} />
                  </ListItemIcon>
                  Add Tickets
                </MenuItem>
              </Link>
            </StyledLinkBox>

            <StyledLinkBox isActive={pathname.includes("/publish")}>
              <Link href={`/manage/event/${id}/publish`}>
                <MenuItem sx={{ padding: "25px", fontWeight: "bold" }}>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ fontSize: "25px" }} />
                  </ListItemIcon>
                  Publish
                </MenuItem>
              </Link>
            </StyledLinkBox>
          </MenuList>
        </Paper>
        <Divider sx={{ marginTop: "10px" }} />

        <Paper sx={{ marginTop: "10px" }}>
          <MenuList>
            <MenuItem sx={{ marginTop: "20px" }}>Dashboard</MenuItem>
            <MenuItem sx={{ padding: 0, marginTop: "20px" }}>
              <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <Typography>Manage Attendees</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper>
                    <MenuList>
                      <StyledLinkBox isActive={pathname.includes("/order")}>
                        <Link href={`/manage/event/${id}/order`}>
                          <MenuItem sx={{ marginBottom: "10px" }}>
                            Orders
                          </MenuItem>
                        </Link>
                      </StyledLinkBox>
                      <StyledLinkBox
                        isActive={pathname.includes("/add-attendee")}
                      >
                        <Link href={`/manage/event/${id}/add-attendee`}>
                          <MenuItem sx={{ marginBottom: "15px" }}>
                            Add Attendees{" "}
                          </MenuItem>
                        </Link>
                      </StyledLinkBox>

                      <MenuItem sx={{ marginBottom: "15px" }}>
                        Email to Attendees
                      </MenuItem>
                      <MenuItem sx={{ marginBottom: "15px" }}>
                        Attendee List
                      </MenuItem>
                      <MenuItem sx={{ marginBottom: "15px" }}>
                        Check-in
                      </MenuItem>
                    </MenuList>
                  </Paper>
                </AccordionDetails>
              </Accordion>
            </MenuItem>
          </MenuList>
        </Paper>
      </Box>
      <Box sx={{ width: "80%", backgroundColor: "#fbf9fa", padding: "10px" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
