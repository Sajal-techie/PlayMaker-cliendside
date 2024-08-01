import React from 'react'
import { Box, Card, CardContent, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
}));

const SkeltonLeftSide = () => {
  return (
    <StyledCard>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Skeleton variant="circular" width={60} height={60} />
        <Box sx={{ ml: 2 }}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} />
        </Box>
      </Box>
      {[1, 2, 3, 4, 5].map((_, index) => (
        <Skeleton key={index} variant="text" width="100%" sx={{ my: 1 }} />
      ))}
    </CardContent>
  </StyledCard>
  )
}

export default SkeltonLeftSide
