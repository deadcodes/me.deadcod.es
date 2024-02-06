import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: "#1a171d",
  },
});

export default function Root({ children }) {
  useEffect(() => {
    // Function to load the script dynamically
    const loadScript = (url, callback) => {
      // const script = document.createElement('script');
      // script.src = url;
      // script.onload = callback;
      // document.body.appendChild(script);
    };

    // Define the function to be called from the injected script
    const callInjectedFunction = (arg1, arg2) => {
      // Check if the injected function exists
      if (window.kofiWidgetOverlay.draw) {
        // Call the injected function with arguments
        window.kofiWidgetOverlay.draw(arg1, arg2);
      } else {
        console.error('Injected function not found.');
      }
    };

    // Load the script dynamically
    // loadScript('https://storage.ko-fi.com/cdn/scripts/overlay-widget.js', () => {
      // Once the script has loaded, call the function with arguments
      callInjectedFunction('deadcodes', {
        'type': 'floating-chat',
        'floating-chat.donateButton.text': 'Support me',
        'floating-chat.donateButton.background-color': '#2d2730',
        'floating-chat.donateButton.text-color': '#1a8870'
      });
    // });

  }, []); // Empty dependency array ensures the effect runs only once after initial render

  return (
    <>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
    </>
  );
}