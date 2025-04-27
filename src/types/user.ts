
export interface User {
  id: string;
  name: string;
  email: string;
  isSubscribed: boolean;
  subdomain?: string;
  token?: string;
}
