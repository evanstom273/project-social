import { type ButtonHTMLAttributes } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-default px-4 py-2.5 text-label-md transition-colors duration-fast disabled:pointer-events-none disabled:opacity-50 min-h-11';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-hover border border-transparent',
  secondary:
    'bg-surface-raised text-text-primary border border-border-default hover:bg-surface-hover',
  ghost:
    'bg-transparent text-text-muted hover:bg-surface-hover hover:text-text-primary border border-transparent',
  destructive:
    'bg-error/15 text-error border border-error/30 hover:bg-error/25',
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
};

function getButtonClassName(variant: ButtonVariant, className?: string) {
  return cn(baseClasses, variantClasses[variant], className);
}

export function Button({
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={getButtonClassName(variant, className)}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={getButtonClassName(variant, className)} {...props} />
  );
}
