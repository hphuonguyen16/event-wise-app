"use client";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import PreviewCard from "./PreviewCard";
import React from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";

const PublishPage = ({ params }: { params: { id: string } }) => {
  const [categories, setCategories] = React.useState([] as any);
  const [formData, setFormData] = React.useState({
    visibility: "public",
    category: "",
    status: "",
  });
  const [isPublished, setIsPublished] = React.useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  function getCategories() {
    axiosPrivate.get(UrlConfig.category.getAllCategories).then((res) => {
      setCategories(res.data.data.data);
    });
  }

  async function handleSave() {
    try {
      if (formData.status !== "ticketing") {
        setSnack({
          open: true,
          message: "Please complete ticketing settings!",
          type: "error",
        });
        return;
      }
      if (!formData.category) {
        setSnack({
          open: true,
          message: "Please select a category!",
          type: "error",
        });
        return;
      }
      const res = await axiosPrivate.put(UrlConfig.event.publishEvent, {
        _id: params.id,
        visibility: formData.visibility,
        category: formData.category,
        isPublished: true,
      });
      if (res.data.status === "success") {
        setSnack({
          open: true,
          message: "Event published successfully!",
          type: "success",
        });
        setIsPublished(true);
      } else {
        setSnack({
          open: true,
          message: "Something went wrong! Please try again!",
          type: "error",
        });
      }
    } catch (error) {
      setSnack({
        open: true,
        message: "Something went wrong! Please try again!",
        type: "error",
      });
    }
  }
  async function handleUnPublish() {
    try {
      if (!formData.category) {
        setSnack({
          open: true,
          message: "Please select a category!",
          type: "error",
        });
        return;
      }
      const res = await axiosPrivate.put(UrlConfig.event.publishEvent, {
        _id: params.id,
        visibility: formData.visibility,
        category: formData.category,
        isPublished: false,
      });
      if (res.data.status === "success") {
        setSnack({
          open: true,
          message: "Event unpublished successfully!",
          type: "success",
        });
        setIsPublished(false);
      } else {
        setSnack({
          open: true,
          message: "Something went wrong! Please try again!",
          type: "error",
        });
      }
    } catch (error) {
      setSnack({
        open: true,
        message: "Something went wrong! Please try again!",
        type: "error",
      });
    }
  }
  const fetchDetailEvent = async () => {
    const response = await axiosPrivate.get(
      UrlConfig.event.getEvent(params.id)
    );
    if (response.data.status === "success") {
      const event = response.data.data.data;
      console.log("event", event);
      setFormData({
        visibility: event.visibility,
        category: event.category,
        status: event.status,
      });
      setIsPublished(event.isPublished);
    }
  };

  console.log("formData", formData);

  React.useEffect(() => {
    getCategories();
    fetchDetailEvent();
  }, []);

  return (
    <Box sx={{ margin: "auto", width: "70%" }}>
      <CustomSnackbar />
      <Box>
        <Typography variant="h3">
          Your event is almost ready to publish
        </Typography>
        <Typography
          sx={{ fontWeight: "bold", marginTop: "20px", marginBottom: "40px" }}
        >
          Review your settings and let everyone find your event.
        </Typography>
        <PreviewCard />
      </Box>
      <Box>
        <Typography variant="h4" sx={{ marginTop: "50px" }}>
          Publish settings
        </Typography>
        <FormControl>
          <Typography
            id="demo-radio-buttons-group-label"
            sx={{ fontWeight: "bold", marginTop: "10px", marginBottom: "20px" }}
          >
            {" "}
            Is your event public or private?
          </Typography>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={formData.visibility}
            onChange={(event) =>
              setFormData({ ...formData, visibility: event.target.value })
            }
          >
            <FormControlLabel
              value="public"
              control={<Radio />}
              label={
                <Stack>
                  <Typography>Public</Typography>
                  <Typography variant="subtitle2">
                    Anyone can see your event and search for it.
                  </Typography>
                </Stack>
              }
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label={
                <Stack>
                  <Typography>Private</Typography>
                  <Typography variant="subtitle2">
                    Only people with the link can see your event.
                  </Typography>
                </Stack>
              }
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <Typography variant="h4" sx={{ marginTop: "50px" }}>
          Search settings
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Choose category for your event
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ opacity: "0.6", marginTop: "10px" }}
          >
            Your category help your event appear in more searches.
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: "20px", width: "70%" }}>
            <Grid item md={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.category}
                  label="Category"
                  onChange={(e) => {
                    setFormData({ ...formData, category: e.target.value });
                  }}
                >
                  {categories.map((category: any) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item md={12}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={age}
                      label="Category"
                      //   onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Subcategory
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //   value={age}
                      label="Subcategory"
                      //   onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Box>
      </Box>
      {!isPublished && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={() => {
              handleSave();
            }}
          >
            Publish event
          </Button>
        </Box>
      )}
      {isPublished && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="outlined"
            color="error"
            sx={{ marginTop: "20px" }}
            onClick={() => {
              handleUnPublish();
            }}
          >
            UnPublish event
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PublishPage;
