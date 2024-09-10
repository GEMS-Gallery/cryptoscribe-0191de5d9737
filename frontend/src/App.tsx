import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, CircularProgress, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { backend } from 'declarations/backend';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

type Post = {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await backend.getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (title: string, body: string, author: string) => {
    try {
      const result = await backend.createPost(title, body, author);
      if ('ok' in result) {
        await fetchPosts();
        setShowForm(false);
      } else {
        console.error('Error creating post:', result.err);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Crypto Blog
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setShowForm(true)}
        sx={{ mb: 4 }}
      >
        New Post
      </Button>
      {showForm && (
        <PostForm onSubmit={handleCreatePost} onCancel={() => setShowForm(false)} />
      )}
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <PostList posts={posts} />
      )}
    </Container>
  );
};

export default App;
