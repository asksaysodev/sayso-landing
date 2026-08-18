import { buildMetadata } from '@/lib/seo/metadata';
import { DifferencesPage } from '@/components/pages/DifferencesPage';

export const metadata = buildMetadata({
  title: 'Sayso vs Shilo, MaverickRE, and ChatGPT',
  description:
    'Agents ask how Sayso compares to Shilo, MaverickRE, ChatGPT, and traditional coaching. The difference is timing: Sayso coaches you during the live call.',
  path: '/differences',
});

export default function Differences() {
  return <DifferencesPage />;
}
