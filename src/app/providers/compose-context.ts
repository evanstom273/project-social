import { createContext } from 'react';

export type ComposeContextValue = {
	openCompose: () => void;
	closeCompose: () => void;
	isComposeOpen: boolean;
};

export const ComposeContext = createContext<ComposeContextValue | null>(null);
