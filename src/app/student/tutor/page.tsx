import { PageHeader } from '@/components/dashboard/page-header';
import { AIChatTutor } from '@/components/dashboard/student/ai-chat-tutor';

export default function Page() {
  return (
    <div>
      <PageHeader title="AI Tutor" description="Get help with your studies." />
      <AIChatTutor />
    </div>
  );
}
