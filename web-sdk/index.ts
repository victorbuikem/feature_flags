import { isFeatureFlagEnabled } from './src/is-feature-flag-enabled';

type InitOptions = {
	apiKey: string;
};

function handleCommands(command: string, ...args: unknown[]) {
	switch (command) {
		case 'init':
			const options = args[0] as InitOptions;
			if (!options?.apiKey) {
				console.error('[FEATURE_FLAG]: Init requires API key');
				return;
			}
			initFeatureFlagSDK(options);

			const instance = {
				isFeatureFlagEnabled
			};

			(window as any).featureflags = instance;

			return instance;
		default:
			console.error(`Unknown command: ${command}`);
	}
}

async function initFeatureFlagSDK(options: InitOptions) {
	try {
		return true;
	} catch (error) {
		console.log('[FEATURE_FLAG]: Invalid API key');
	}
}

function initSdk() {
	const sdk = (command: string, ...args: unknown[]) => {
		return handleCommands(command, ...args);
	};

	//@ts-ignore
	window.FeatureFlags = sdk;
}

initSdk();
