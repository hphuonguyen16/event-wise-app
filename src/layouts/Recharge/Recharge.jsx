"use client";
import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import RootModal from "../../components/common/modals/RootModal";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";
import UrlConfig from "@/config/urlConfig";

const Recharge = ({ openRecharge, setOpenRecharge }) => {
  const axiosPrivate = useAxiosPrivate();
  const { setSnack } = useSnackbar();
  const [money, setMoney] = React.useState(0);
  const handleRecharge = async () => {
    if (!money) {
      setSnack({
        ...snack,
        open: true,
        message: "Please enter the amount of money to recharge",
        type: "error",
      });
      return;
    }
    if (money <= 0) {
      setSnack({
        ...snack,
        open: true,
        message: "Invalid amount of money",
        type: "error",
      });
      return;
    }
    if (money < 50000 || money > 5000000) {
      setSnack({
        ...snack,
        open: true,
        message: "Amount of money must be between 50.000 and 5.000.000",
        type: "error",
      });
      return;
    }
    await axiosPrivate
      .post(UrlConfig.transaction.deposit, {
        amount: Number(money),
      })
      .then((res) => {
        // open new page to pay
        window.open(res.data.url, "_blank");
        setOpenRecharge(false);
      })
      .catch((err) => {
        setSnack({
          ...snack,
          open: true,
          message: "Something went wrong! Please try again!",
          type: "error",
        });
      });
  };
  return (
    <>
      <CustomSnackbar />
      <RootModal
        variant="Create"
        title="Nạp tiền vào tài khoản"
        open={openRecharge}
        width="500px"
        height="250px"
        handleClose={() => setOpenRecharge(false)}
        handleOk={() => handleRecharge()}
        closeOnly={false}
      >
        <Box sx={{ my: 3 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">
              Số tiền nạp
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">đ</InputAdornment>
              }
              label="Số tiền nạp"
              type="number"
              placeholder="(50.000 - 5.000.000)"
              onChange={(e) => setMoney(e.target.value)}
            />
          </FormControl>
        </Box>
      </RootModal>
    </>
  );
};

export default Recharge;
