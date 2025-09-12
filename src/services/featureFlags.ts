// src/services/featureFlags.ts
export const flags = {
  builderEnabled: false,          // default off
  newsEnabled: true,
  botsEnabled: true,
  lmsEnabled: true,
  pricingEnabled: true,
};

// Soft guard so pages don’t return null when envs are missing
export const isOn = (k: keyof typeof flags) => {
  if (k === 'builderEnabled') {
    // Only enable if explicitly configured, otherwise keep rendering fallbacks
    return !!process.env.NEXT_PUBLIC_BUILDER_API_KEY;
  }
  return flags[k];
};
