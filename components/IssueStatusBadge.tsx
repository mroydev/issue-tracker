import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

const statusColor = (status: Status) => {
  switch (status) {
    case 'OPEN':
      return 'red';
    case 'CLOSED':
      return 'green';
    case 'IN_PROGRESS':
      return 'violet';
    default:
      return 'gray'; // Fallback color for undefined statuses
  }
};

// Helper function to format status
const formatStatus = (status: Status) => {
  // Convert status to capitalize format
  return status.charAt(0) + status.slice(1).toLowerCase();
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusColor(status)}>
      {formatStatus(status).replace('_', ' ')}
    </Badge>
  );
};

export default IssueStatusBadge;
