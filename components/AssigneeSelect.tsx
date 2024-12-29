'use client';

import { Select } from '@radix-ui/themes';
import React from 'react';
import axios from 'axios';
import { Issue, User } from '@prisma/client';

import toast from 'react-hot-toast';
import { useUsersQuery } from '@/contexts/ReactQueryProvider ';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error } = useUsersQuery();

  if (error) return null;

  // Function to handle value change
  const handleValueChange = async (userId: string, issueId: string) => {
    try {
      const updatedUserId = userId === 'unassigned' ? null : userId;

      await axios.patch(`/api/issues/${issueId}`, {
        assignedToUserId: updatedUserId,
      });

      toast.success('Assignee updated successfully!');
    } catch (error) {
      console.error('Failed to update assignee:', error);
      toast.error('Failed to update assignee');
    }
  };

  return (
    <>
      <Select.Root
        // Set the default value to the current assignee or 'unassigned'
        defaultValue={
          issue.assignedToUserId ? issue.assignedToUserId.toString() : ''
        }
        // Update the assignee when the value changes
        onValueChange={(userId) =>
          handleValueChange(userId, issue.id.toString())
        }
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {/* Instead of an empty string, use a keyword like "unassigned" */}
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user: User) => (
              <Select.Item key={user.id} value={user.id.toString()}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneeSelect;
