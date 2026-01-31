import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Student Performance" description="Track student performance." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Student performance content goes here.</p>
      </div>
    </div>
  );
}
