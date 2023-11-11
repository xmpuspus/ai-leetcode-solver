import React, { useState, useMemo } from 'react';
import { Container, Grid, Typography, Box, Button, CircularProgress, Switch, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import axios from 'axios';
import SolutionDisplay from './components/SolutionDisplay';
import HistorySidebar from './components/HistorySidebar';

function App() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [solution, setSolution] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#90caf9' : '#1976d2',
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#f7f7f7',
        paper: mode === 'dark' ? '#1d1d1d' : '#ffffff',
      },
    },
  }), [mode]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      setSolution('');
    }
  };

  const handleSolve = async () => {
    if (!uploadedImage) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', uploadedImage);

    try {
      const response = await axios.post('http://localhost:81/solver', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSolution(response.data.text);
      setHistory([...history, { image: uploadedImage, solution: response.data.text }]);
      setLoading(false);
    } catch (error) {
      console.error('Error solving the problem:', error);
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (uploadedImage) {
      handleSolve();
    } else {
      document.getElementById('upload-input').click();
    }
  };

  const handleHistoryClick = (historyRecord) => {
    setUploadedImage(historyRecord.image);
    setSolution(historyRecord.solution);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        <Box position="fixed" top={0} right={0} p={1} zIndex="tooltip">
          <Switch checked={mode === 'dark'} onChange={toggleMode} />
          <Typography variant="body2" style={{ marginLeft: '8px' }}>
            {mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </Typography>
        </Box>
        <Grid container spacing={0}>
          <Grid item xs={2} style={{ height: '100vh', overflowY: 'auto', borderRight: '1px solid #ccc' }}>
            <HistorySidebar history={history} onHistoryClick={handleHistoryClick} />
          </Grid>
          <Grid item xs={10} style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Box py={4} px={2} display="flex" flexDirection="column" alignItems="center" flexGrow={1}>
              <Typography variant="h2" gutterBottom align="center" style={{ fontFamily: 'Arial, sans-serif' }}>
                AI Leetcode Solver
              </Typography>
              <Box width="100%" display="flex" justifyContent="center" mb={2}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-input"
                  type="file"
                  onChange={handleImageChange}
                />
                <Button variant="contained" color="primary" onClick={handleButtonClick} disabled={loading}>
                  {loading ? <CircularProgress size={24} /> : (uploadedImage ? 'Solve' : 'Upload Image of Leetcode Problem')}
                </Button>
              </Box>
              {uploadedImage && (
                <SolutionDisplay
                  image={uploadedImage}
                  solution={solution}
                  onImageClick={() => document.getElementById('upload-input').click()}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
