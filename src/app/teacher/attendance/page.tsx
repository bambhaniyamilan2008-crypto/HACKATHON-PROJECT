import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Attendance" description="Manage student attendance." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Attendance management content goes here.</p>
      </div>
    </div>
  );
}
