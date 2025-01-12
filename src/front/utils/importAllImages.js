export const importAllImages = (requireContext) => {
    return requireContext.keys().map((key) => requireContext(key).default);
  };
  