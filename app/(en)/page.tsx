import { Home } from '@/lib/home';
import { StructuredData } from '@/lib/root';

export default function Page() {
  return (
    <>
      <StructuredData locale="en" />
      <Home locale="en" />
    </>
  );
}
