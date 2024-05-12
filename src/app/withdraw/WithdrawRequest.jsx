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

const WithdrawRequest = () => {
  const isMobile = false;
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState({
    amount: 0,
    bank_account: {
      number: "",
      owner_name: "",
      bank_name: "",
    },
  });
  const fetchData = async () => {
    // fetch data
  };
  const handleWithdraw = async () => {
    if (data.amount === 0) {
    }
    if (data.amount > 0) {
    }
    setIsSubmit(true);
    // update data
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Grid container spacing={5}>
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
