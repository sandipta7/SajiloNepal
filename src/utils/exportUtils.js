export const exportIssuesToCSV = (issues) => {
  const headers = [
    'Tracking ID',
    'Title',
    'Category',
    'Severity',
    'Status',
    'Municipality',
    'Ward',
    'Location',
    'Impact Score',
    'Upvotes',
    'Reported At',
    'Assigned Responder',
  ];

  const rows = issues.map((issue) => [
    `"${issue.trackingNumber}"`,
    `"${issue.title.replace(/"/g, '""')}"`,
    `"${issue.category}"`,
    `"${issue.severity}"`,
    `"${issue.status}"`,
    `"${issue.municipality}"`,
    `"${issue.ward}"`,
    `"${issue.locationName.replace(/"/g, '""')}"`,
    issue.impactScore,
    issue.upvotes,
    `"${new Date(issue.reportedAt).toLocaleString()}"`,
    `"${issue.assignedResponder?.name || 'Unassigned'}"`,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((r) => r.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `sajilo_nepal_civic_reports_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
