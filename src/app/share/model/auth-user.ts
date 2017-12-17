export interface AuthUser {
  userName: string,
  authKey: string,
  isLoggedIn: boolean,
  userFullName?: string,
  userAvatar?: string
};
