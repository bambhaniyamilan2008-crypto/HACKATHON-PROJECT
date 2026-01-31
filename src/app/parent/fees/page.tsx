import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Fee Status" description="View and pay fees." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Fee status content goes here.</p>
      </div>
    </div>
  );
}
