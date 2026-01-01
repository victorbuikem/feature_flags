type InitOptions = {
	apiKey: string;
};

interface FeatureFlagsAPI {
	(command: 'init', options: InitOptions): void;
	q?: IArguments[];
}

function handleCommands(command: string, ...args: unknown[]) {
	switch (command) {
		case 'init':
			const options = args[0] as InitOptions;
			if (!options?.apiKey) {
				console.error('[FeatureFlags] init requires apiKey');
				return;
			}
			initFeatureFlagSDK(options);

			const instance = {
				isFeatureFlagEnabled: (key: string) => {
					const dice = Math.floor(Math.random() * 6);
					console.log(dice);
					if (dice > 3) {
						return true;
					}
					return false;
				}
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
		console.log('[FEATUREFLAGS]: Invalid API keys');
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
