'use client';

import React, { useState } from 'react';
import 'easymde/dist/easymde.min.css';
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { issueSchema } from '@/lib/validations';
import { z } from 'zod';
import ErrorMessage from '../ErrorMessage';
import Spinner from '../Spinner';
import { Issue } from '@prisma/client';
import axios from 'axios';
import toast from 'react-hot-toast'; // Import toast
import { useSession } from 'next-auth/react'; // Import useSession

type IssueFormProps = {
  actionType: 'create' | 'edit';
  selectedIssue?: Issue;
};

const IssueForm = ({ actionType, selectedIssue }: IssueFormProps) => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { data: session } = useSession(); // Get session data

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof issueSchema>>({
    resolver: zodResolver(issueSchema),
    defaultValues:
      actionType === 'edit'
        ? {
            title: selectedIssue?.title,
            description: selectedIssue?.description,
          }
        : undefined,
  });

  const onSubmit = async (issue: z.infer<typeof issueSchema>) => {
    // Prevent submission if not authenticated
    if (!session) {
      toast.error('You must be logged in to create an issue.', {
        duration: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      let response;

      if (actionType === 'create') {
        // API call for creating a new issue
        response = await axios.post('/api/issues', issue);
      } else if (actionType === 'edit' && selectedIssue?.id) {
        // API call for editing an existing issue
        response = await axios.patch(`/api/issues/${selectedIssue.id}`, issue);
      }

      // Handle server response
      if (response?.status === 201 || response?.status === 200) {
        router.push('/issues'); // Redirect after successful submission

        if (actionType === 'create') {
          toast.success('Issue created successfully!', { duration: 3000 });
        } else if (actionType === 'edit') {
          toast.success('Issue updated successfully!', { duration: 3000 });
        }
      } else {
        setError('Failed to submit the issue. Please try again.');
        toast.error('Failed to submit the issue. Please try again.', {
          duration: 4000,
        });
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again later.');
      toast.error('An error occurred. Please try again later.', {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <form className="max-w-xl space-y-5 px-5" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <TextField.Root
        placeholder="Title"
        {...register('title')}
        onKeyDown={handleKeyPress}
      ></TextField.Root>

      <ErrorMessage>{errors.title?.message}</ErrorMessage>

      <div className="">
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />
        {errors.description && (
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        )}
      </div>

      <Button type="submit">
        {actionType === 'create' ? 'Submit New Issue' : 'Save Changes'}
        {isSubmitting && <Spinner />}
      </Button>
    </form>
  );
};

export default IssueForm;
