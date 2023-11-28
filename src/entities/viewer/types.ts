export interface ViewerModel {
  id: string;
  email: string;
  login: string;
  isActivated: boolean;
  avatar?: {
    id: string;
    link: string;
  } | null;
}
