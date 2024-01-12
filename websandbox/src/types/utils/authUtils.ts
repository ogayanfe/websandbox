interface UserType {
  id: number;
  username: string;
}

interface CredentialsType {
  username: string;
  password: string;
}

type AuthTokenType = {
  access: string;
  refresh: string;
};

type AccessTokenDecodedType = {
  token_type: "access";
  exp: string;
  iat: string;
  jti: string;
  user_id: number;
};

type RefreshTokenDecodedType = {
  token_type: "refresh";
  exp: string;
  iat: string;
  jti: string;
  user_id: number;
};

export type {
  CredentialsType,
  AuthTokenType,
  AccessTokenDecodedType,
  RefreshTokenDecodedType,
  UserType,
};
