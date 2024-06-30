import { sha256 } from 'js-sha256';

const clientId = 'ce40fcd2-fabf-4e81-b5ae-3cdd8818cfb0';
const redirectUri = 'http://lvh.me/';
const authorizationEndpoint = 'https://huggingface.co/oauth/authorize';
const tokenEndpoint = 'https://huggingface.co/oauth/token';
const scopes = 'openid profile inference-api';

import PKCE from 'js-pkce';

const pkce = new PKCE({
  client_id: clientId,
  redirect_uri: redirectUri,
  authorization_endpoint: authorizationEndpoint,
  token_endpoint: tokenEndpoint,
  requested_scopes: scopes,
});

export const authUrl = pkce.authorizeUrl();

const url = window.location.href;
if (url.includes('code')) {
    pkce.exchangeForAccessToken(url).then((resp) => {
        const token = resp.access_token;
        sessionStorage.setItem('accessToken', token);
        window.location.href = '/';
    });
}