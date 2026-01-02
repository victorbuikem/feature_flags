type InitOptions = {
	apiKey: string;
};

interface FeatureFlagsAPI {
	(command: 'init', options: InitOptions): void;
	q?: IArguments[];
}

declare global {
	interface Window {
		FeatureFlags: FeatureFlagsAPI;
	}
}

export {};
