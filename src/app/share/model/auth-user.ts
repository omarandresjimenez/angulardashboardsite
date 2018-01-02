export interface AuthUser {
  userName: string,
  userMail: string,
  authKey: string,
  isLoggedIn: boolean,
  userFullName?: string,
  userAvatar?: string
};
