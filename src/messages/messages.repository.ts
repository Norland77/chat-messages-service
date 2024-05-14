import { Controller } from '@nestjs/common';
import { MessageDto } from './dto/message-create.dto';
import { IFile } from './interfaces/IFile';
import { IMessage } from './interfaces/IMessage';
import { PrismaService } from '../prisma/prisma.service';
import { MessageEditDto } from './dto/message-edit.dto';

@Controller('messages')
export class MessagesRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createMessage(dto: MessageDto, filesInput: IFile[]): Promise<IMessage> {
    return this.prismaService.messages.create({
      data: {
        text: dto.text,
        userId: dto.userId,
        roomId: dto.roomId,
        username: dto.username,
        files: {
          create: filesInput ? filesInput : [],
        },
      },
      include: {
        files: true,
      },
    });
  }

  async getAllMessages(id: string): Promise<IMessage[] | []> {
    return this.prismaService.messages.findMany({
      where: {
        roomId: id,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        files: true,
        User: true,
      },
    });
  }

  async findMessageById(id: string): Promise<IMessage | null> {
    return this.prismaService.messages.findFirst({
      where: {
        id,
      },
    });
  }

  async deleteMessage(id: string): Promise<IMessage> {
    return this.prismaService.messages.delete({
      where: {
        id,
      },
      include: {
        files: true,
      },
    });
  }

  async editMessage(dto: MessageEditDto): Promise<IMessage> {
    return this.prismaService.messages.update({
      where: {
        id: dto.id,
      },
      data: {
        text: dto.message.text,
      },
    });
  }

  getAllImagesByRoom(id: string): Promise<IFile[]> {
    return this.prismaService.file.findMany({
      where: {
        Messages: {
          roomId: id,
        },
        OR: [
          {
            mimetype: 'image/jpeg',
          },
          {
            mimetype: 'image/png',
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async uploadAvatar(file: IFile) {
    return this.prismaService.file.create({
      data: {
        mimetype: file.mimetype,
        path: file.path,
        name: file.name,
      },
    });
  }

  async findFileByPath(path: string) {
    return this.prismaService.file.findFirst({
      where: {
        path,
      },
    });
  }

  async deleteFileById(id: string) {
    return this.prismaService.file.delete({
      where: {
        id,
      },
    });
  }
}
