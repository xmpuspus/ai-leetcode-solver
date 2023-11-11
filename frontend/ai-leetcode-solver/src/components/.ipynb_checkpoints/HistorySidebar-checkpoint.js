import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

function HistorySidebar({ history, onHistoryClick }) {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom align="center" style={{ fontWeight: 'bold' }}>
        History
      </Typography>
      <Box style={{ overflowY: 'auto', height: 'calc(100vh - 64px)' }}>
        {history.map((entry, index) => (
          <Paper key={index} style={{ marginBottom: '10px', padding: '10px', cursor: 'pointer' }} onClick={() => onHistoryClick(entry)}>
            <img src={URL.createObjectURL(entry.image)} alt={`History ${index}`} style={{ maxWidth: '100%', height: 'auto' }} />
            <Typography variant="body2" style={{ fontFamily: 'Courier New, monospace', whiteSpace: 'pre-wrap' }}>
              {entry.solution}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default HistorySidebar;
