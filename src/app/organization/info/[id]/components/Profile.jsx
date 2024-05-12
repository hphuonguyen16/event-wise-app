import React from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Stack,
  Button,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import Image from "next/image";

import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import EventCard from "@/components/Events/EventCard";
import he from "he";

const Profile = ({ profileInfo }) => {
  console.log(profileInfo);

  return (
    <>
      {profileInfo && (
        <Box>
          <Box
            sx={{
              height: "80vh",
              width: "100%",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={profileInfo?.avatar}
              alt="image"
              layout="fill"
              objectFit="cover"
              style={{ filter: "blur(8px)", width: "100%", height: "100%" }}
            />
          </Box>
          <Card
            sx={{
              width: "50%",
              height: "80%",
              background: "white",
              position: "absolute",
              top: "45%",
              left: "50%",
              padding: "40px 20px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Stack justifyContent={"center"} alignItems={"center"}>
              <img
                src={profileInfo?.avatar}
                alt="image"
                objectFit="cover"
                style={{ borderRadius: "50%", width: "150px", height: "150px" }}
              />
              <Typography variant="h2" sx={{ marginTop: "15px" }}>
                {profileInfo?.name}
              </Typography>
              <Stack direction="row" spacing={2} sx={{ marginTop: "15px" }}>
                <Button variant="contained">Follow</Button>
                <Button variant="outlined">Contact</Button>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent={"center"}
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Box>
                <Typography variant="h6">8.9K </Typography>
                <Typography variant="subtitle2">Follows </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box>
                <Typography variant="h6">298 </Typography>
                <Typography variant="subtitle2">Total events </Typography>
              </Box>
            </Stack>
            <Stack sx={{ padding: "20px 100px" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: he?.decode(profileInfo?.bio),
                }}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent={"center"}
              spacing={2}
              sx={{ mt: 1 }}
            >
              <Link href={profileInfo.social?.facebook || "#"}>
                {profileInfo.social?.facebook && (
                  <div
                    className={
                      "flex items-center justify-center w-12 h-12 mt-2 rounded bg-gray-100 hover:bg-gray-200"
                    }
                  >
                    <FacebookIcon
                      sx={{
                        fontSize: "32px",
                        stroke: "#ffffff",
                        strokeWidth: 1,
                      }}
                      color="primary"
                    />
                  </div>
                )}
              </Link>
              <Link href={profileInfo.social?.twitter || "#"}>
                {profileInfo.social?.twitter && (
                  <div
                    className={
                      "flex items-center justify-center w-12 h-12 mt-2 rounded bg-gray-100 hover:bg-gray-200"
                    }
                  >
                    <TwitterIcon
                      sx={{
                        fontSize: "30px",
                        stroke: "#ffffff",
                        strokeWidth: 1,
                      }}
                      color="primary"
                    />
                  </div>
                )}
              </Link>
              <Link href={profileInfo.website || "#"}>
                {profileInfo.website && (
                  <div
                    className={
                      "flex items-center justify-center w-12 h-12 mt-2 rounded bg-gray-100 hover:bg-gray-200"
                    }
                  >
                    <LanguageIcon
                      sx={{
                        fontSize: "30px",
                        stroke: "#ffffff",
                        strokeWidth: 1,
                      }}
                      color="primary"
                    />
                  </div>
                )}
              </Link>
            </Stack>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Profile;
