import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme, CssBaseline, Box, AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { CloudUpload, FolderCopy } from "@mui/icons-material";
import { FileUpload } from "./components/FileUpload";
import { FileList } from "./components/FileList";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: { main: "#673ab7" },
    secondary: { main: "#ff4081" },
    background: { default: "#f5f5f5" },
  },
  shape: { borderRadius: 12 },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={0} sx={{ bgcolor: "white", color: "text.primary", borderBottom: "1px solid #e0e0e0" }}>
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.main" }}>
                  DriveSync
                </Typography>
                <Button component={Link} to="/" startIcon={<CloudUpload />} sx={{ mr: 2 }}>
                  Upload
                </Button>
                <Button component={Link} to="/files" startIcon={<FolderCopy />}>
                  Meus Arquivos
                </Button>
              </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
              <Routes>
                <Route path="/" element={<FileUpload />} />
                <Route path="/files" element={<FileList />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
