import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Text } from '@/components/ui/Text';
import { ROUTES } from '@/config/constants';

const highlights = [
  {
    title: 'Projects matter as much as profiles',
    description:
      'Follow the thing being made — a game, album, build, or novel — not just the person behind it.',
  },
  {
    title: 'Chronological by default',
    description:
      'The public feed is newest-first. Ranking appears only when you explicitly ask for it.',
  },
  {
    title: 'Small updates are valid',
    description:
      'A sentence and a screenshot should feel complete. The interface is built for work in progress.',
  },
];

const craftExamples = [
  'Indie games',
  '3D art',
  'Minecraft builds',
  'Software tools',
  'Writing',
  'Woodworking',
  'Music',
  'Electronics',
];

export function HomePage() {
  return (
    <Container width="feed">
      <div className="space-y-10">
        <header className="space-y-5">
          <Text as="p" variant="label-sm" className="text-primary">
            Work in progress, shared openly
          </Text>
          <Text as="h1" variant="display-sm">
            Discover, follow and share things while they&apos;re being made.
          </Text>
          <Text variant="body-lg" muted>
            Project Social is a visual network organised around projects, creators and
            communities — a lively creative workshop, not an engagement-optimised feed.
          </Text>
          <div className="flex flex-wrap gap-3 pt-2">
            <ButtonLink to={ROUTES.explore}>Explore projects</ButtonLink>
            <ButtonLink to={ROUTES.signup} variant="secondary">
              Join early access
            </ButtonLink>
          </div>
        </header>

        <section
          className="rounded-lg border border-border-subtle bg-surface p-6 md:p-8"
          aria-labelledby="highlights-heading"
        >
          <Text as="h2" id="highlights-heading" variant="headline-sm">
            Built for makers and curious spectators
          </Text>
          <ul className="mt-6 space-y-5">
            {highlights.map((item) => (
              <li key={item.title} className="border-t border-border-subtle pt-5 first:border-t-0 first:pt-0">
                <Text as="h3" variant="headline-sm" className="text-base">
                  {item.title}
                </Text>
                <Text variant="body-md" muted className="mt-2">
                  {item.description}
                </Text>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="crafts-heading">
          <Text as="h2" id="crafts-heading" variant="headline-sm">
            Any kind of project belongs here
          </Text>
          <Text variant="body-md" muted className="mt-3">
            Game development may be an early culture, but the platform supports every
            craft where people make things in public.
          </Text>
          <ul className="mt-5 flex flex-wrap gap-2">
            {craftExamples.map((craft) => (
              <li
                key={craft}
                className="rounded-full border border-border-default bg-surface-raised px-3 py-1.5 text-label-md text-text-secondary"
              >
                {craft}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="rounded-lg border border-border-subtle bg-surface-raised p-6"
          aria-labelledby="feed-preview-heading"
        >
          <Text as="h2" id="feed-preview-heading" variant="headline-sm">
            A feed you can trust
          </Text>
          <Text variant="body-md" muted className="mt-3">
            Everything and Following are explicit views. No hidden re-ranking because you
            lingered on a clip. The default public stream is chronological — newest post
            first.
          </Text>
          <div className="mt-5 inline-flex rounded-default border border-border-default bg-surface p-1">
            <span className="rounded-sm bg-primary-muted px-3 py-1.5 text-label-md text-primary">
              Everything
            </span>
            <span className="px-3 py-1.5 text-label-md text-text-muted">Following</span>
          </div>
        </section>
      </div>
    </Container>
  );
}
