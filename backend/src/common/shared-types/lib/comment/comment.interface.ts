import { UserInterface } from '../user/user.interface';

export type CommentInterface = {
  user: UserInterface;
  text: string;
};
