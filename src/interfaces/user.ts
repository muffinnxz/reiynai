export interface UserData {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  answers?: { [key: string]: { [key: string]: string[] } };
}
