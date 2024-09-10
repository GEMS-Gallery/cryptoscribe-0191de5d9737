import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type PostFormProps = {
  onSubmit: (title: string, body: string, author: string) => void;
  onCancel: () => void;
};

const PostForm: React.FC<PostFormProps> = ({ onSubmit, onCancel }) => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmitForm = (data: any) => {
    const htmlBody = draftToHtml(convertToRaw(data.body.getCurrentContent()));
    onSubmit(data.title, htmlBody, data.author);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title?.message as string}
            />
          )}
        />
        <Controller
          name="body"
          control={control}
          defaultValue={EditorState.createEmpty()}
          rules={{ required: 'Body is required' }}
          render={({ field }) => (
            <Editor
              editorState={field.value}
              onEditorStateChange={field.onChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          )}
        />
        <Controller
          name="author"
          control={control}
          defaultValue=""
          rules={{ required: 'Author is required' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Author"
              variant="outlined"
              error={!!errors.author}
              helperText={errors.author?.message as string}
            />
          )}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="outlined" onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">Submit</Button>
        </Box>
      </Box>
    </form>
  );
};

export default PostForm;
