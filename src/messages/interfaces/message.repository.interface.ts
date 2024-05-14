import { MessageDto } from '../dto/message-create.dto';
import { IFile } from './IFile';
import { IMessage } from './IMessage';
import { MessageEditDto } from '../dto/message-edit.dto';

export interface IMessageRepository {
  /**
   * Creates a new message in a room.
   *
   * @param dto - A DTO containing message creation information (text, user ID, room ID, username).
   * @param filesInput - An optional array of file objects representing uploaded files associated with the message.
   * @returns {Promise<IMessage>} A promise resolving to the newly created message object with included files.
   */
  createMessage(dto: MessageDto, filesInput?: IFile[]): Promise<IMessage>;

  /**
   * Retrieves all messages from a specific room, ordered by creation time (ascending).
   *
   * @param id - The ID of the room to retrieve messages from.
   * @returns {Promise<IMessage[] | []>} A promise resolving to an array of message objects with included files, or an empty array if no messages are found.
   */
  getAllMessages(id: string): Promise<IMessage[] | []>;

  /**
   * Finds a message by its ID.
   *
   * @param id - The ID of the message to find.
   * @returns {Promise<IMessage | null>} A promise resolving to the message object if found, otherwise null.
   */
  findMessageById(id: string): Promise<IMessage | null>;

  /**
   * Deletes a message by its ID.
   *
   * @param id - The ID of the message to delete.
   * @returns {Promise<IMessage>} A promise resolving to the deleted message object with included files.
   */
  deleteMessage(id: string): Promise<IMessage>;

  /**
   * Edits an existing message.
   *
   * @param dto - A DTO containing the message ID and the updated text.
   * @returns {Promise<IMessage>} A promise resolving to the updated message object.
   */
  editMessage(dto: MessageEditDto): Promise<IMessage>;

  /**
   * Find an images by room`s ID.
   *
   * @param id - The room`s ID.
   * @returns {Promise<IFIle[]>} A promise resolving to the array finds images object.
   */
  getAllImagesByRoom(id: string): Promise<IFile[]>;
}
