export const getInternalTemplatePath = (config: Record<string, any>) => {
  const runtime = config.runtime.toLowerCase();

  if (!config.nuiFramework) {
    return `${runtime}/vanilla`;
  }

  return `${runtime}/nui/${config.nuiFramework.toLowerCase()}`;
};
