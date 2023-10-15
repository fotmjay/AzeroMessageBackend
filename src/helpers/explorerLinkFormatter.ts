export const explorerLinkFormatter = (explorerUrl: string, queryType: string, identifier: string) => {
  return `${explorerUrl}${queryType}${identifier}`;
};
