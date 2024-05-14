import { BadRequestException, Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { MessageDto } from './dto/message-create.dto';
import { IMessage } from './interfaces/IMessage';
import { IFile } from './interfaces/IFile';
import { MessageEditDto } from './dto/message-edit.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly messageRepository: MessagesRepository) {}

  async createMessage(dto: MessageDto): Promise<IMessage> {
    let filesInput: IFile[] = [
      {
        name: '',
        mimetype: '',
        path: '',
      },
    ];
    if (dto.files.length > 0) {
      filesInput = dto.files.map((file: IFile) => ({
        name: file.name,
        path: file.path,
        mimetype: file.mimetype,
      }));
    }

    return this.messageRepository.createMessage(dto, filesInput);
  }

  async getAllMessagesByRoom(id: string): Promise<IMessage[]> {
    return this.messageRepository.getAllMessages(id);
  }

  async findMessageById(id: string): Promise<void> {
    const message = await this.messageRepository.findMessageById(id);

    if (!message) {
      throw new BadRequestException(`message with id: ${id} is not exist`);
    }
  }

  async deleteMessage(id: string): Promise<IMessage> {
    return this.messageRepository.deleteMessage(id);
  }

  async editMessage(dto: MessageEditDto): Promise<IMessage> {
    return this.messageRepository.editMessage(dto);
  }

  async getAllImagesByRoom(id: string): Promise<IFile[]> {
    return this.messageRepository.getAllImagesByRoom(id);
  }

  async uploadAvatar(file: IFile) {
    return this.messageRepository.uploadAvatar(file);
  }

  async findFileByPath(path: string) {
    return this.messageRepository.findFileByPath(path);
  }

  async deleteFileById(id: string) {
    return this.messageRepository.deleteFileById(id);
  }
}
