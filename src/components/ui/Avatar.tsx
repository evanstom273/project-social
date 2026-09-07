import { cn } from '@/lib/cn';

type AvatarProps = {
	src?: string | null;
	alt: string;
	size?: 'xs' | 'sm' | 'md' | 'lg';
	className?: string;
	fallback?: string;
};

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
	xs: 'size-5 text-[10px]',
	sm: 'size-8 text-label-sm',
	md: 'size-9 text-label-md',
	lg: 'size-10 text-body-sm',
};

export function Avatar({
	src,
	alt,
	size = 'md',
	className,
	fallback,
}: AvatarProps) {
	const initials = fallback ?? alt.charAt(0).toUpperCase();

	if (src) {
		return (
			<img
				src={src}
				alt={alt}
				className={cn(
					'rounded-full object-cover ring-1 ring-border-default',
					sizeClasses[size],
					className,
				)}
			/>
		);
	}

	return (
		<span
			className={cn(
				'inline-flex shrink-0 items-center justify-center rounded-full bg-surface-subtle text-text-secondary ring-1 ring-border-subtle',
				sizeClasses[size],
				className,
			)}
			aria-hidden="true"
		>
			{initials}
		</span>
	);
}
