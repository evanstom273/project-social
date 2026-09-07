import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { ComposeContext } from '@/app/providers/compose-context';
import { ComposeDialog } from '@/components/feed/ComposeDialog';

type ComposeProviderProps = {
	children: ReactNode;
};

export function ComposeProvider({ children }: ComposeProviderProps) {
	const [isComposeOpen, setIsComposeOpen] = useState(false);

	const openCompose = useCallback(() => setIsComposeOpen(true), []);
	const closeCompose = useCallback(() => setIsComposeOpen(false), []);

	const value = useMemo(
		() => ({ openCompose, closeCompose, isComposeOpen }),
		[openCompose, closeCompose, isComposeOpen],
	);

	return (
		<ComposeContext.Provider value={value}>
			{children}
			<ComposeDialog open={isComposeOpen} onClose={closeCompose} />
		</ComposeContext.Provider>
	);
}
