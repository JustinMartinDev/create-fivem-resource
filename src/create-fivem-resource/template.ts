export const getInternalTemplatePath = (config: Record<string, any>) => {
  const runtime = config.runtime.toLowerCase();

  if (!config.Nui) {
    return `${runtime}/vanilla`;
  }

  return `${runtime}/nui/${config.nuiFramewok.toLowerCase()}`;
};
