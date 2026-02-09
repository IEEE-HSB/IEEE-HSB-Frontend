import { ReactNode } from 'react';
import KnowledgeHubHeader from '@/components/knowledge-hub/KnowledgeHubHeader';
import CategoryCards from '@/components/knowledge-hub/CategoryCards';

export default function KnowledgeHubLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* Header - ثابت في جميع صفحات Knowledge Hub */}
      <KnowledgeHubHeader />
      
      {/* Category Cards - ثابتة للانتقال بين الأقسام */}
      <section className="container mx-auto px-4 py-8">
        <CategoryCards />
      </section>

      {/* المحتوى المتغير حسب الصفحة */}
      {children}
    </div>
  );
}
