export interface UserInterface {
  firstname: string,
  lastname: string,
  email: string,
  password: string,
}

export interface LoginUserInterface {
  id?: string;
  email?: string,
  password?: string,
  name?: string;
}

export interface UserServiceInterface {
  id: string | null;
  name: string | undefined;
}
