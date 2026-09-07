export const FEED_SCROLL_STORAGE_KEY = 'project-social:feed-scroll-y';

export function saveFeedScrollPosition(scrollTop: number) {
	sessionStorage.setItem(FEED_SCROLL_STORAGE_KEY, String(scrollTop));
}

export function readFeedScrollPosition(): number | null {
	const value = sessionStorage.getItem(FEED_SCROLL_STORAGE_KEY);
	if (!value) {
		return null;
	}

	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : null;
}

export function clearFeedScrollPosition() {
	sessionStorage.removeItem(FEED_SCROLL_STORAGE_KEY);
}

export function getAppMainScrollElement(): HTMLElement | null {
	return document.getElementById('app-main-scroll');
}

export function saveCurrentFeedScrollPosition() {
	const main = getAppMainScrollElement();
	if (main) {
		saveFeedScrollPosition(main.scrollTop);
	}
}
