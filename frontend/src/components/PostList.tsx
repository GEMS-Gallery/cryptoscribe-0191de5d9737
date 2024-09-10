import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

type Post = {
  id: bigint;
  title: string;
  body: string;
  author: string;
  timestamp: bigint;
};

type PostListProps = {
  posts: Post[];
};

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {posts.map((post) => (
        <Card key={post.id.toString()} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: post.body }} />
            <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2 }}>
              By {post.author} | {new Date(Number(post.timestamp) / 1000000).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostList;
