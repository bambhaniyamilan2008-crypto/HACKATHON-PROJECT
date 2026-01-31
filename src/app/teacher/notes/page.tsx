import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Notes & Materials" description="Upload and manage course materials." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Notes and materials content goes here.</p>
      </div>
    </div>
  );
}
