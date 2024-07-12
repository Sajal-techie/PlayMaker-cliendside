import React from 'react';
import {
  Modal,
  Paper,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: '20px auto',
  maxWidth: '600px',
  borderRadius: theme.shape.borderRadius * 2,
  maxHeight: '90vh',
  overflowY: 'auto',
  position:'relative',
}));

const InfoItem = ({ label, value, capitalize = null }) => (
  <Box mb={2}>
    <Typography variant="body2" color="textSecondary" component="div" textTransform={capitalize} fontWeight="bold">
      {label}
    </Typography>
    <Typography variant="body1" component="div" textTransform={capitalize}>
      {value || 'N/A'}
    </Typography>
  </Box>
);

const PlayerDetailsModal = ({ selectedPlayer, handleCloseModal }) => {
  if (!selectedPlayer) return null;

  return (
    <Modal open={!!selectedPlayer} onClose={handleCloseModal}>
      <StyledPaper elevation={5}>
            <Button
                sx={{position:'absolute', top:15,right:0,}}
                color='inherit'
                title='close'
                onClick={handleCloseModal}
            >
              ✕
            </Button>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mb={3}>
              <Typography variant="h4" gutterBottom textTransform={'capitalize'} fontWeight="bold">
                {selectedPlayer.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {selectedPlayer.email}
              </Typography>
              <Chip
                label={selectedPlayer.status.toUpperCase()}
                color={
                  selectedPlayer.status === 'approved'
                    ? 'success'
                    : selectedPlayer.status === 'rejected'
                    ? 'error'
                    : 'default'
                }
                sx={{ mt: 1 }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ mb: 3 }} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <InfoItem
              label="ID"
              value={selectedPlayer.unique_id}
            />
            <InfoItem
              label="Date of Birth"
              value={new Date(selectedPlayer.dob).toDateString()}
            />
            <InfoItem
              label="District"
              value={selectedPlayer.district}
              capitalize={'capitalize'}
            />
            <InfoItem
              label="State"
              value={selectedPlayer.state}
              capitalize={'capitalize'}
            />
          </Grid>

          <Grid item xs={12} sm={6} > 
            {selectedPlayer.achievement !== 'None' && (
              <InfoItem
                label="Achievement"
                value={`${selectedPlayer.achievement} team`}
                capitalize={'capitalize'}
              />
            )}
            {selectedPlayer.additional_requirements.length > 0 && (
              <Box mt={2}>
                {selectedPlayer.additional_requirements.map((obj, index) => (
                  <InfoItem 
                    key={index}
                    label={obj.requirement} 
                    value={obj.value}
                    capitalize={'capitalize'}
                  /> 
                ))}
              </Box>
            )}
          </Grid>
        </Grid>
      </StyledPaper>
    </Modal>
  );
};

export default PlayerDetailsModal;