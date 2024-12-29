import IssueForm from '@/components/forms/IssueForm';
import React from 'react';

const Page = async () => {
  return (
    <div className="flex justify-center">
      <IssueForm actionType="create" />
    </div>
  );
};

export default Page;
