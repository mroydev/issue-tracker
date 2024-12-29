'use client';

import { Issue } from '@prisma/client';
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const DeleteIssueButton = ({ issue }: { issue: Issue }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // To store error message
  const router = useRouter();

  // Function to handle the deletion of the issue
  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMessage(null); // Reset any previous errors

    try {
      // Send a DELETE request to the API to delete the issue
      const response = await axios.delete(`/api/issues/${issue.id}`);

      // Check if the response contains an error
      if (response.status !== 200) {
        throw new Error('Failed to delete issue');
      }

      // Redirect to the issues list after successful deletion
      router.push('/issues');
      toast.success('Issue deleted successfully', { duration: 3000 });
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to delete the issue. Please try again.');
      setIsDeleting(false); // Reset deleting state in case of error
    }
  };

  return (
    <AlertDialog.Root>
      {/* Trigger the AlertDialog on button click */}
      <AlertDialog.Trigger>
        <Button
          color="red"
          style={{ cursor: 'pointer' }}
          className="flex items-center space-x-2 bg-red-500 text-white hover:bg-red-800"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete Issue'}
          <TrashIcon />
        </Button>
      </AlertDialog.Trigger>

      {/* AlertDialog content */}
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>

        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>

        {/* Display error message if deletion fails */}
        {errorMessage && (
          <p style={{ color: 'red', marginTop: '8px' }}>{errorMessage}</p>
        )}

        {/* Action buttons inside the AlertDialog */}
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              onClick={handleDelete} // Trigger deletion only on confirm
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Confirm Delete'}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
