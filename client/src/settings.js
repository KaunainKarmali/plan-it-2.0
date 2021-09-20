const production = false;

// Server Url
const localServerUrl = "http://localhost:5000";
const remoteServerUrl = "https://plan-it-2.herokuapp.com";
export const serverUrl = production ? remoteServerUrl : localServerUrl;

// GraphQl Url
const localGraphqlUrl = "http://localhost:5000/graphql";
const remoteGraphqlUrl = "/graphql";
export const uri = production ? remoteGraphqlUrl : localGraphqlUrl;
