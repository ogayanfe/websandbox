import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { redirect } from "react-router-dom";
import { CredentialsType, AuthTokenType, AccessTokenDecodedType } from "../types/utils/authUtils";

const SERVER_BASE_URL =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:8000"
    : "https://websandbox.pythonanywhere.com/";

const TOKEN_OBTAIN_URL = `${SERVER_BASE_URL}/accounts/token/`;
const TOKEN_REFRESH_URL = `${SERVER_BASE_URL}/accounts/token/refresh/`;
const TOKEN_LOCAL_STORAGE_KEY = "tokens";

let axiosClient: AxiosInstance | null = null;

function getAuthTokens(): AuthTokenType | null {
  // Get Authentication tokens if they exist
  const tkString = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  if (tkString) {
    return JSON.parse(tkString);
  }
  return null;
}

function updateAuthTokens(tokens: AuthTokenType) {
  // Update authentication tokens
  const value = JSON.stringify(tokens);
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, value);
}

function clearAuthTokens() {
  // Delete authentication tokens
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}

function getApiClient(): AxiosInstance {
  // Returns an axios api client. Returns an existing api client is one as already been created
  // else creates a new one and returns it.
  if (!axiosClient) {
    axiosClient = axios.create({
      baseURL: SERVER_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    addInterceptors(axiosClient);
  }

  return axiosClient;
}

let refreshingToken = false;
async function newAccessTokens(refresh: string): Promise<AuthTokenType | null> {
  // I have to access the new tokens this way because react router runs each loader in
  // paralell so when requesting for new tokens multiple request a fired at the same time
  // only the first request that reaches the server succeeds because the server blacklist the
  // refresh token so all other requests fail with a status of unauthorized by doing this am
  // forcing all other requests to wait for whoever first requests for new tokens and giving does
  // retrieved tokens to all the other request.

  // whoever gets here while a request for new tokens as to wait for the result

  function waitForTokens() {
    if (!refreshingToken) {
      // return the tokens that has already been set by previous request
      return getAuthTokens();
    }
  }
  if (refreshingToken) {
    requestAnimationFrame(waitForTokens);
  }

  refreshingToken = true;
  const response = await axios.post<AuthTokenType>(TOKEN_REFRESH_URL, {
    refresh: refresh,
  });
  if (response.status !== 200) {
    refreshingToken = false;
    logout();
    return null;
  }

  updateAuthTokens(response.data);
  refreshingToken = false;
  return response.data;
}

function addInterceptors(apiClient: AxiosInstance) {
  apiClient.interceptors.request.use(async (config) => {
    // The interceptor job is to check if user tokens exist or is till below the
    // expiry data before every request. In a case were access tokens are expired
    // request new tokens from the backend and set them before continueing with our
    // request.
    // The interceptor does nothing if the users don't have tokens or if refresh tokens expires,
    //so if a request returns a 401 unautherized response, then we can log the user out

    const authTokens = getAuthTokens();
    if (!authTokens) {
      // If the users don't have tokens do nothing
      return config;
    }
    const accessTokenDecoded = jwtDecode<AccessTokenDecodedType>(authTokens.access); // decode access tokens
    const isExpired = dayjs.unix(parseInt(accessTokenDecoded.exp)).diff(dayjs()) < 1; // check for expiration

    if (!isExpired) {
      // Access token is still valid so set header and return
      config.headers.Authorization = `Bearer ${authTokens.access}`;
      return config;
    }

    // request new access tokens
    const tokens = await newAccessTokens(authTokens.refresh);
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.access}`; // set authorization token
    }

    return config;
  });
}

function logout() {
  return clearAuthTokens();
}

async function login(credentials: CredentialsType): Promise<Boolean> {
  const apiClient = getApiClient();
  const response = await apiClient.post<AuthTokenType>(TOKEN_OBTAIN_URL, credentials);
  if (response.status <= 399 && response.status >= 200) {
    updateAuthTokens(response.data);
    return true;
  }
  return false;
}

async function signup(credentials: CredentialsType): Promise<AxiosResponse | null> {
  const apiClient = getApiClient();
  try {
    const response = await apiClient.post<AuthTokenType>("/accounts/signup/", credentials);
    updateAuthTokens(response.data);
    return null;
  } catch (error) {
    if (error instanceof AxiosError) return error.response ? error.response : null;
    return null;
  }
}

async function updateProfile(credentials: {username?: string, password?: string}): Promise<AxiosResponse | null>{
  const apiClient = getApiClient();
  try{
    await apiClient.patch<AuthTokenType>("/accounts/update/", credentials)
    return null
  }
  catch(error){
    if (error instanceof AxiosError) return error?.response || null;
    return null
  }
}

function redirectAuthenticatedUserRouteLoader() {
  if (getAuthTokens() !== null) {
    return redirect("/dashboard");
  }
  return null;
}

export {
  getApiClient,
  getAuthTokens,
  login,
  signup,
  logout,
  updateProfile, 
  SERVER_BASE_URL,
  updateAuthTokens,
  clearAuthTokens,
  TOKEN_OBTAIN_URL,
  TOKEN_REFRESH_URL,
  redirectAuthenticatedUserRouteLoader,
};
