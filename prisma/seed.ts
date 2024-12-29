import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

const issueData = [
  {
    title: 'Login Page Not Loading',
    description:
      "The login page fails to load properly for users across different browsers and devices. This issue was first observed after a routine server upgrade last week. Users have reported seeing either a blank page or a 'Connection Timed Out' error. We suspect this could be related to changes in the authentication service or the firewall configuration. The impact is critical as no one is able to log in to their accounts, which could lead to a drop in user engagement and trust in the platform.",
    status: Status.OPEN,
    createdAt: new Date('2024-09-01 10:00:00'),
    updatedAt: new Date('2024-09-01 10:15:00'),
  },
  {
    title: 'Error in Payment Gateway',
    description:
      "Multiple users have reported encountering errors while attempting to process their payments. Specifically, the error message 'Transaction Failed: Please Try Again' appears after they submit their payment details. This issue has persisted for over 48 hours, resulting in a significant drop in sales. After initial investigations, it appears that the payment gateway provider made some changes to their API which were not backward compatible. We are currently liaising with the provider to resolve the problem as soon as possible.",
    status: Status.IN_PROGRESS,
    createdAt: new Date('2024-09-02 11:05:00'),
    updatedAt: new Date('2024-09-02 11:10:00'),
  },
  {
    title: 'Search Function Not Working',
    description:
      'The search functionality on our website is currently returning incorrect or incomplete results. Customers are unable to find specific products or blog posts even when using exact matches to the title or keywords. This has led to user frustration and a significant number of complaints. We suspect the search index is not being properly updated when new items are added to the database. A quick fix might involve re-indexing the search database, but further investigation is needed to determine the root cause.',
    status: Status.OPEN,
    createdAt: new Date('2024-09-03 09:00:00'),
    updatedAt: new Date('2024-09-03 09:30:00'),
  },
  {
    title: 'Broken Image Links on Homepage',
    description:
      "Several image links on the homepage are broken, resulting in missing visuals for key marketing sections. This issue is primarily affecting the banner images and promotional ads, which play a crucial role in attracting user attention. The broken links seem to have occurred after a CDN migration, where the image paths may not have been updated properly. This issue needs urgent fixing as it impacts the website's aesthetics and user engagement metrics.",
    status: Status.IN_PROGRESS,
    createdAt: new Date('2024-09-04 08:45:00'),
    updatedAt: new Date('2024-09-04 09:15:00'),
  },
  {
    title: 'Mobile Responsiveness Issues',
    description:
      'Our website is currently experiencing several mobile responsiveness issues, with certain sections not displaying properly on smaller screens. For example, the navigation menu overlaps with other elements, and some buttons are completely unclickable. This is particularly concerning since mobile traffic makes up over 60% of our user base. We will need to review the CSS media queries and make the necessary adjustments to ensure a smooth user experience across all mobile devices.',
    status: Status.OPEN,
    createdAt: new Date('2024-09-05 10:20:00'),
    updatedAt: new Date('2024-09-05 10:50:00'),
  },
  {
    title: 'Database Connection Timeout',
    description:
      'Users are facing frequent timeouts when trying to connect to the database, particularly during peak traffic hours. This has led to significant downtime for the application, frustrating users and causing potential loss of revenue. Initial analysis suggests that the database may be underprovisioned for the current load, or there could be an issue with the connection pooling mechanism. An urgent review of the database infrastructure and load balancing setup is required.',
    status: Status.IN_PROGRESS,
    createdAt: new Date('2024-09-06 11:10:00'),
    updatedAt: new Date('2024-09-06 11:40:00'),
  },
  {
    title: 'Slow API Response Times',
    description:
      'Our API response times have significantly increased over the past week, resulting in delays in data loading on the frontend. Users are reporting that some pages take upwards of 30 seconds to load, which is far from acceptable. This could be due to inefficient database queries or a bottleneck in the server processing. Addressing this is critical to maintain performance standards and prevent user drop-offs.',
    status: Status.OPEN,
    createdAt: new Date('2024-09-07 12:00:00'),
    updatedAt: new Date('2024-09-07 12:10:00'),
  },
  {
    title: 'Password Reset Email Not Sending',
    description:
      'Users attempting to reset their passwords are not receiving the reset email. This issue affects a large number of users, many of whom are locked out of their accounts. After reviewing the email logs, it appears that the emails are being queued but not sent due to a misconfiguration in the SMTP server. The issue needs to be resolved quickly to prevent further frustration and loss of user trust.',
    status: Status.CLOSED,
    createdAt: new Date('2024-09-08 09:25:00'),
    updatedAt: new Date('2024-09-08 09:55:00'),
  },
  {
    title: 'Memory Leak in Node.js Server',
    description:
      'Our Node.js server is experiencing a memory leak, causing it to consume increasing amounts of RAM over time, which eventually leads to crashes. This issue has been gradually worsening over the past few weeks. Memory profiling suggests that the leak is likely occurring due to uncleaned event listeners or unresolved promises. Fixing this will require an in-depth code audit to identify the exact location of the leak.',
    status: Status.IN_PROGRESS,
    createdAt: new Date('2024-09-09 14:15:00'),
    updatedAt: new Date('2024-09-09 14:45:00'),
  },
  {
    title: 'User Profile Images Not Updating',
    description:
      'Users are unable to update their profile images on their accounts. While the upload process appears successful, the new image does not replace the old one. Further investigation reveals that the issue lies with the caching mechanism, which continues to serve the old image even after the new one has been uploaded. We need to implement a cache busting strategy to resolve this.',
    status: Status.OPEN,
    createdAt: new Date('2024-09-10 13:05:00'),
    updatedAt: new Date('2024-09-10 13:25:00'),
  },
  {
    title: 'UI Bug on Checkout Page',
    description:
      'A significant UI bug on the checkout page is preventing users from modifying the quantity of items in their shopping cart. This has resulted in several incorrect orders being processed and numerous user complaints. It appears that a recent JavaScript update broke the event listeners attached to the quantity buttons. This issue needs immediate attention as it directly affects our sales process.',
    status: Status.CLOSED,
    createdAt: new Date('2024-09-11 15:00:00'),
    updatedAt: new Date('2024-09-11 15:20:00'),
  },
  {
    title: 'Notifications Not Displaying',
    description:
      'System notifications are not being displayed for users upon login, leading to missed updates about important account activities and service changes. This is particularly concerning for time-sensitive updates, such as payment reminders or account security alerts. Initial analysis suggests a bug in the notification service that fails to trigger the display event in certain circumstances.',
    status: Status.OPEN,
    createdAt: new Date('2024-09-12 11:30:00'),
    updatedAt: new Date('2024-09-12 11:45:00'),
  },
  {
    title: 'Data Duplication in Reports',
    description:
      'Users have reported that reports generated by the system contain duplicate entries for several records. After reviewing the report generation logic, it appears that the bug stems from the data aggregation process, where some records are counted more than once. Resolving this issue is critical to maintain data integrity and user trust in our reporting features.',
    status: Status.IN_PROGRESS,
    createdAt: new Date('2024-09-13 09:15:00'),
    updatedAt: new Date('2024-09-13 09:45:00'),
  },
  {
    title: 'Error Handling in API Endpoints',
    description:
      'We have noticed that certain API endpoints do not have proper error handling in place, leading to uninformative error messages being returned to the clients. This lack of clear communication can confuse users and hinder debugging efforts. A comprehensive review of all API endpoints is needed to implement consistent error handling and improve user experience.',
    status: Status.OPEN,
    createdAt: new Date('2024-09-14 10:00:00'),
    updatedAt: new Date('2024-09-14 10:20:00'),
  },
  {
    title: 'Session Timeout Issue',
    description:
      'Some users are experiencing unexpected session timeouts, causing them to be logged out while they are actively using the application. This issue seems to occur more frequently on mobile devices and may be related to the session handling configuration on the backend. Immediate investigation is needed to improve user experience and maintain session integrity.',
    status: Status.CLOSED,
    createdAt: new Date('2024-09-15 12:30:00'),
    updatedAt: new Date('2024-09-15 13:00:00'),
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const issue of issueData) {
    await prisma.issue.create({
      data: issue,
    });
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
