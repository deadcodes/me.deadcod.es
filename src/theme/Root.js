import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: '#1a171d',
  },
});

export default function Root({ children }) {
  return (
    <>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />{children}</ThemeProvider>
    </>
  );
}