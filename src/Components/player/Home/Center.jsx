import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import PostItem from '../../layouts/profile layouts/Post Section/PostItem';
import NewPostForm from './NewPostForm';
import zIndex from '@mui/material/styles/zIndex';



const Center = ({posts,fetchPosts}) => {
   return (
      <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
        {/* <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>Feed</Typography> */}
        <NewPostForm fetchPosts={fetchPosts}  />
          {posts.map((post, index) => (
            <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: index * 0.09 }}
            >
              <PostItem post={post}  />
            </motion.div> 
          ))}
      </Box>
  )
}

export default Center
