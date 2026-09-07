import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
	width: 20,
	height: 20,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 2,
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
	'aria-hidden': true,
};

export function IconMenu(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M4 7h16M4 12h16M4 17h16" />
		</svg>
	);
}

export function IconHome(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
		</svg>
	);
}

export function IconExplore(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<circle cx="12" cy="12" r="9" />
			<path d="M9 9l6 6m0-6l-6 6" />
		</svg>
	);
}

export function IconCommunities(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
		</svg>
	);
}

export function IconProjects(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
		</svg>
	);
}

export function IconSaved(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
		</svg>
	);
}

export function IconClose(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M18 6L6 18M6 6l12 12" />
		</svg>
	);
}

export function IconAdd(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M12 5v14M5 12h14" />
		</svg>
	);
}

export function IconSearch(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<circle cx="11" cy="11" r="7" />
			<path d="M20 20l-3.5-3.5" />
		</svg>
	);
}

export function IconBell(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
			<path d="M13.73 21a2 2 0 01-3.46 0" />
		</svg>
	);
}

export function IconMore(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" />
			<circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
			<circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
		</svg>
	);
}

export function IconHeart(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
		</svg>
	);
}

export function IconComment(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8z" />
		</svg>
	);
}

export function IconShare(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
			<path d="M16 6l-4-4-4 4M12 2v13" />
		</svg>
	);
}

export function IconBookmark(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
		</svg>
	);
}

export function IconPlay(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<polygon points="9,6 20,12 9,18" fill="currentColor" stroke="none" />
		</svg>
	);
}

export function IconInfo(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<circle cx="12" cy="12" r="9" />
			<path d="M12 16v-4M12 8h.01" />
		</svg>
	);
}

export function IconSend(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
		</svg>
	);
}

export function IconCheck(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M20 6L9 17l-5-5" />
		</svg>
	);
}

export function IconChevronDown(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M6 9l6 6 6-6" />
		</svg>
	);
}

export function IconSort(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M7 4v16M17 4v16M7 8h3M14 16h3M7 16h3M14 8h3" />
		</svg>
	);
}

export function IconImage(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<rect x="3" y="5" width="18" height="14" rx="2" />
			<circle cx="8.5" cy="10.5" r="1.5" />
			<path d="M21 15l-5-5L5 21" />
		</svg>
	);
}

export function IconVideo(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<rect x="3" y="6" width="13" height="12" rx="2" />
			<path d="M16 10l5-3v10l-5-3" />
		</svg>
	);
}

export function IconCode(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
		</svg>
	);
}

export function IconFlag(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M4 4v16M4 4h12l-2 4 2 4H4" />
		</svg>
	);
}

export function IconHelp(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<circle cx="12" cy="12" r="9" />
			<path d="M9.5 9a2.5 2.5 0 015 0c0 2-2.5 1.8-2.5 3.5M12 17h.01" />
		</svg>
	);
}

export function IconDownload(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
		</svg>
	);
}

export function IconHoneycomb(props: IconProps) {
	return (
		<svg {...baseProps} {...props}>
			<path d="M12 2l3 1.7v3.4L12 9l-3-1.9V3.7L12 2zM5 7l3 1.7v3.4L5 14l-3-1.9V8.7L5 7zM19 7l3 1.7v3.4L19 14l-3-1.9V8.7L19 7zM12 12l3 1.7v3.4L12 19l-3-1.9v-3.4L12 12z" />
		</svg>
	);
}
