export { LocalLoginInput, LocalLoginOutput } from './localLogin.dto';
export { SocialLoginOutput } from './socialLogin.dto';

export interface SocialUser {
  email: string;
  firstName: string;
  lastName: string;
  accessToken: string;
}
