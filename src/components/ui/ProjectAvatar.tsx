import { cn } from '@/lib/cn';

type ProjectAvatarProps = {
	initial: string;
	accentClassName?: string;
	size?: 'sm' | 'md';
	className?: string;
};

const sizeClasses: Record<NonNullable<ProjectAvatarProps['size']>, string> = {
	sm: 'size-8 text-body-sm',
	md: 'size-9 text-headline-sm',
};

export function ProjectAvatar({
	initial,
	accentClassName = 'text-primary',
	size = 'md',
	className,
}: ProjectAvatarProps) {
	return (
		<span
			className={cn(
				'inline-flex shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-surface-overlay font-bold shadow-inner',
				sizeClasses[size],
				accentClassName,
				className,
			)}
			aria-hidden="true"
		>
			{initial}
		</span>
	);
}
