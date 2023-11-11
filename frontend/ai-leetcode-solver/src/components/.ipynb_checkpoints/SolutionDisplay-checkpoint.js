import React from 'react';
import { Typography, Box, Paper } from '@mui/material';

function SolutionDisplay({ image, solution, onImageClick }) {
  return (
    <Paper style={{ padding: '20px', width: '75%', textAlign: 'left', overflow: 'hidden' }}>
      <Box onClick={onImageClick} style={{ cursor: 'pointer', marginBottom: '10px' }}>
        <img src={URL.createObjectURL(image)} alt="Uploaded Leetcode Problem" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>
      <Typography variant="subtitle1" style={{ fontFamily: 'Courier New, monospace', whiteSpace: 'pre-wrap' }}>
        {solution}
      </Typography>
    </Paper>
  );
}

export default SolutionDisplay;
