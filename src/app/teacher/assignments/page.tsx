import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Assignments" description="Create and grade assignments." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Assignments content goes here.</p>
      </div>
    </div>
  );
}
