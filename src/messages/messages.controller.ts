import { Controller } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { IFile } from './interfaces/IFile';
import { IMessage } from './interfaces/IMessage';
import {
  ClientProxy,
  ClientProxyFactory,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';
import { MessageDto } from './dto/message-create.dto';
import { MessageEditDto } from './dto/message-edit.dto';

@Controller('messages')
export class MessagesController {
  private readonly room_client: ClientProxy;
  constructor(private readonly messageService: MessagesService) {
    this.room_client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 5003,
      },
    });
  }

  @MessagePattern('get.allImages')
  async getAllImagesByRoom(id: string): Promise<IFile[]> {
    this.room_client.send('get.byId', id);
    return this.messageService.getAllImagesByRoom(id);
  }

  @MessagePattern('get.all')
  async getAllMessage(id: string): Promise<IMessage[]> {
    this.room_client.send('get.byId', id);

    return this.messageService.getAllMessagesByRoom(id);
  }

  @MessagePattern('delete.byId')
  async deleteMessage(id: string): Promise<IMessage> {
    await this.messageService.findMessageById(id);

    return this.messageService.deleteMessage(id);
  }

  @MessagePattern('post.create')
  async createMessage(dto: MessageDto): Promise<IMessage> {
    return this.messageService.createMessage(dto);
  }

  @MessagePattern('get.fileByPath')
  async findFileByPath(path: string) {
    return this.messageService.findFileByPath(path);
  }

  @MessagePattern('delete.fileById')
  async deleteFileById(id: string) {
    return this.messageService.deleteFileById(id);
  }

  @MessagePattern('post.uploadAvatar')
  async uploadAvatar(data: { mimetype: string; path: string; name: string }) {
    return this.messageService.uploadAvatar(data);
  }

  @MessagePattern('put.edit')
  async editMessage(dto: MessageEditDto) {
    return this.messageService.editMessage(dto);
  }
}
