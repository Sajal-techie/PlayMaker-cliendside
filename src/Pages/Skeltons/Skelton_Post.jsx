import React from 'react'
import { Box, Card, CardContent, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
}));

const Skelton_Post = () => {
  return (
    <Box sx={{ maxWidth: 435, margin: 'auto' }}>
      {/* <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} /> */}
      {[1, 2, 3].map((_, index) => (
        <StyledCard key={index}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box sx={{ ml: 2 }}>
              <Skeleton variant="text" width={120} />
              <Skeleton variant="text" width={80} />
            </Box>
          </Box>
          <Skeleton variant="rectangular" height={118} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Skeleton variant="text" width={100} />
            <Skeleton variant="text" width={100} />
          </Box>
        </CardContent>
      </StyledCard>
      ))}
    </Box>
  )
}

export default Skelton_Post
