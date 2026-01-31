import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Academic Progress" description="View your child's academic progress." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Academic progress content goes here.</p>
      </div>
    </div>
  );
}
