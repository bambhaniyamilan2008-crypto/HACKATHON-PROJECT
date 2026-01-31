import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Attendance" description="View your child's attendance." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Child's attendance content goes here.</p>
      </div>
    </div>
  );
}
