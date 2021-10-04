const production = true;

// Server Url
const localServerUrl = "http://localhost:5000";
const remoteServerUrl = "https://plan-it-2.herokuapp.com";
export const serverUrl = production ? remoteServerUrl : localServerUrl;

// GraphQl Url
const localGraphqlUrl = `${localServerUrl}/graphql`;
const remoteGraphqlUrl = `${remoteServerUrl}/graphql`;
export const uri = production ? remoteGraphqlUrl : localGraphqlUrl;
