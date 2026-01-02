export const isFeatureFlagEnabled = async (key: string) => {
	const res = await fetch(`http://localhost:5173/api/v1/public/sdk/feature-flags/${key}`);
	const data = await res.json();
	return data.isEnabled;
};
