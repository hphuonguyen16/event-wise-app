import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
  Stack,
  Box,
} from "@mui/material";
import BankCard from "./BankCard";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import UrlConfig from "@/config/urlConfig";
import useSnackbar from "@/context/snackbarContext";
import CustomSnackbar from "@/components/common/Snackbar";

const WithdrawRequest = () => {
  const isMobile = false;
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const { setSnack } = useSnackbar();
  const [data, setData] = useState({
    amount: 0,
    bank_account: {
      number: "",
      owner_name: "",
      bank_name: "",
    },
  });
  async function fetchBankAccountData() {
    const res = await axiosPrivate.get(UrlConfig.bankAccount.getMyBankAccount);
    setData({
      ...data,
      bank_account: {
        number: res.data.data.number,
        owner_name: res.data.data.owner_name,
        bank_name: res.data.data.bank_name,
      },
    });
    setIsLoading(false);
  }
  const handleWithdraw = async () => {
    try {
      const res = await axiosPrivate.post(
        UrlConfig.withdrawal.createWithdrawalRequest,
        {
          amount: data.amount,
          bank_account: data.bank_account,
        }
      );
      if (res.data.status === "success") {
        setSnack({
          open: true,
          message: "Your withdraw request has been submitted successfully",
          type: "success",
        });
      } else {
        setSnack({
          open: true,
          message: "Your withdraw request has been failed",
          type: "error",
        });
      }
    } catch (error) {
      setSnack({
        open: true,
        message: error.response.data.message || "Something went wrong",
        type: "error",
      });
    }
    // update data
  };
  useEffect(() => {
    fetchBankAccountData();
  }, []);
  return (
    <Grid container spacing={5}>
      <CustomSnackbar />
      <Grid item xs={12} md={6}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Yêu cầu rút tiền
        </Typography>
        <div>
          <FormControl sx={{ marginTop: 2 }} fullWidth>
            <InputLabel htmlFor="outlined-adornment-amount">
              Số tiền rút
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={
                <InputAdornment position="start">đ</InputAdornment>
              }
              label="Số tiền rút"
              type="number"
              onChange={(e) => setData({ ...data, amount: e.target.value })}
            />
            <FormHelperText id="outlined-weight-helper-text">
              Số dư: 0
            </FormHelperText>
          </FormControl>
        </div>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => handleWithdraw()}
        >
          Rut tien
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack direction="column" spacing={2} sx={{ my: 2 }}>
          <Typography variant="h4">Thông tin tài khoản rút tiền</Typography>
          {isMobile ? (
            <Box
              sx={{
                border: "1px solid #E0E0E0",
                borderRadius: "10px",
                padding: "20px",
              }}
            >
              <Typography variant="subtitle1">
                Ngan hang: {data.bank_account.bank_name}
              </Typography>
              <Typography variant="subtitle1">
                Ten chu tai khoan: {data.bank_account.owner_name}
              </Typography>
              <Typography variant="subtitle1">
                so tai khoan: {data.bank_account.number}
              </Typography>
            </Box>
          ) : (
            <BankCard data={data.bank_account} />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default WithdrawRequest;
