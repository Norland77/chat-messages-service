export class MessageEditDto {
  id: string;
  message: IMessage;
}

interface IMessage {
  text: string;
  roomId: string;
}
