import { useContext } from 'react';

import { ComposeContext } from '@/app/providers/compose-context';

export function useCompose() {
	const context = useContext(ComposeContext);
	if (!context) {
		throw new Error('useCompose must be used within ComposeProvider');
	}
	return context;
}
