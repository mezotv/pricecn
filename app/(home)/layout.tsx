import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...baseOptions}>
      <div className="pt-8 md:pt-16 bg-background dark:bg-black">
        {children}
      </div>
    </HomeLayout>
  );
}
