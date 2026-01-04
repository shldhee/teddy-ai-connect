export const getPageContext = (): string => {
  // Simple implementation: get the text content of the body
  // In a real app, you might want to exclude scripts, styles, etc.
  return document.body.innerText || "No content found on page.";
};
