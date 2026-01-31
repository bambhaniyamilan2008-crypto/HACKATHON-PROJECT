import { PageHeader } from '@/components/dashboard/page-header';

export default function Page() {
  return (
    <div>
      <PageHeader title="Quizzes" description="Create and manage quizzes." />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p>Quizzes content goes here.</p>
      </div>
    </div>
  );
}
