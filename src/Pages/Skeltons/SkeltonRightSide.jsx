import React from 'react'
import { Box, Card, CardContent, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
}));

const SkeltonRightSide = () => {
  return (
    <>
    <StyledCard>
      <CardContent>
        <Skeleton variant="text" width={150} sx={{ mb: 2 }} />
        {[1, 2, 3].map((_, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ ml: 2 }}>
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={60} />
            </Box>
          </Box>
        ))}
      </CardContent>
    </StyledCard>
    <StyledCard>
      <CardContent>
        <Skeleton variant="text" width={150} sx={{ mb: 2 }} />
        {[1, 2, 3, 4, 5].map((_, index) => (
          <Skeleton key={index} variant="text" width="100%" sx={{ my: 1 }} />
        ))}
      </CardContent>
    </StyledCard>
  </>
  )
}

export default SkeltonRightSide
