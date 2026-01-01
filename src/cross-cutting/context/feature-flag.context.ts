export const isFeatureFlagActive = (featureFlag: string, byDefault: boolean = false): boolean => {
  const featureFlagValue = process.env[featureFlag] ?? byDefault.toString();
  return featureFlagValue.toLowerCase() === 'true';
};
