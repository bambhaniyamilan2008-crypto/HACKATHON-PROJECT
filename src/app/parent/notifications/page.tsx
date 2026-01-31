import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Notifications" description="View school notifications." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Notifications content goes here.</p>
      </div>
    </div>
  );
}
