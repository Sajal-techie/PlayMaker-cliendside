import React, { useState } from 'react';
import { Card, CardContent, Avatar, Box, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PostModal from '../../layouts/profile layouts/Post Section/PostModal';
import { IoMdPhotos } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../api/api';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
  }));
  
  const PostComposer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: theme.palette.grey[100],
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  }));
const NewPostForm = ({ fetchPosts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profile = useSelector(state=>state.auth.profile)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      <StyledCard>
        <CardContent>
          <Box display="flex" alignItems="center" mb={2}>
            <Avatar sx={{ width: 40, height: 40, mr: 2 }}>
                {
                    profile &&
                    <img src={baseUrl+profile} alt="username" />
                }
            </Avatar>
            <PostComposer onClick={handleOpenModal} flexGrow={1}>
              <Typography color="text.secondary">What's on your mind?</Typography>
            </PostComposer>
          </Box>
          <Box display="flex" justifyContent="space-around">
            <IconButton onClick={handleOpenModal} color="primary">
                <IoMdPhotos />
              <Typography variant="body2" sx={{ ml: 1 }}>Photo</Typography>
            </IconButton>
            <IconButton onClick={handleOpenModal} color="primary">
                <FaVideo />
              <Typography variant="body2" sx={{ ml: 1 }}>Video</Typography>
            </IconButton>
          </Box>
        </CardContent>
      </StyledCard>
    <PostModal isOpen={isModalOpen} onClose={handleCloseModal} fetchPosts={fetchPosts} />
    </>
  );
};

export default NewPostForm;