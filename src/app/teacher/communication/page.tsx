import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Communication" description="Communicate with students and parents." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Communication content goes here.</p>
      </div>
    </div>
  );
}
