import { type ButtonHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	active?: boolean;
	size?: 'sm' | 'md';
};

export function Chip({
	active = false,
	size = 'md',
	className,
	type = 'button',
	...props
}: ChipProps) {
	return (
		<button
			type={type}
			className={cn(
				'inline-flex items-center gap-1 whitespace-nowrap rounded-full border font-label-md transition-colors duration-fast',
				size === 'sm' ? 'h-6 px-2.5 text-[12px]' : 'h-7 px-3 text-label-sm',
				active
					? 'border-border-strong bg-surface-raised text-primary'
					: 'border-border-subtle bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary',
				className,
			)}
			aria-pressed={active}
			{...props}
		/>
	);
}
