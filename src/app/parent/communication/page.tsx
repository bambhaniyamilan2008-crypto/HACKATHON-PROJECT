import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Teacher Communication" description="Communicate with teachers." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Teacher communication content goes here.</p>
      </div>
    </div>
  );
}
