import { PlaceholderPanel } from '@/components/ui/PlaceholderPanel';
import { Container } from '@/components/ui/Container';

type FeaturePlaceholderPageProps = {
  title: string;
  description: string;
};

export function FeaturePlaceholderPage({
  title,
  description,
}: FeaturePlaceholderPageProps) {
  return (
    <Container width="feed">
      <PlaceholderPanel title={title} description={description} />
    </Container>
  );
}
