import { IFile } from '../interfaces/IFile';

export class MessageDto {
  files?: IFile[];
  text: string;
  roomId: string;
  userId: string;
  username: string;
}
