import { type HTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

type TextVariant =
  | 'display-lg'
  | 'display-sm'
  | 'headline-lg'
  | 'headline-md'
  | 'headline-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'label-md'
  | 'label-sm'
  | 'caption';

type TextElement = 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: TextElement;
  variant?: TextVariant;
  muted?: boolean;
};

const variantClasses: Record<TextVariant, string> = {
  'display-lg': 'text-display-lg',
  'display-sm': 'text-display-sm',
  'headline-lg': 'text-headline-lg',
  'headline-md': 'text-headline-md',
  'headline-sm': 'text-headline-sm',
  'body-lg': 'text-body-lg',
  'body-md': 'text-body-md',
  'body-sm': 'text-body-sm',
  'label-md': 'text-label-md',
  'label-sm': 'text-label-sm',
  caption: 'text-caption',
};

export function Text({
  as: Component = 'p',
  variant = 'body-md',
  muted = false,
  className,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        variantClasses[variant],
        muted ? 'text-text-muted' : 'text-text-primary',
        className,
      )}
      {...props}
    />
  );
}
