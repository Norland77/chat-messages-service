import { IMessage } from './IMessage';
import { IFile } from './IFile';

export interface IMessageController {
  /**
   * Retrieves all messages from a specific room, ordered by creation time (ascending).
   *
   * @param id - The ID of the room to retrieve messages from.
   * @throws {BadRequestException} - Thrown by the underlying service if the room is not found.
   * @returns {Promise<IMessage[] | []>} A promise resolving to an array of message objects with included files, or an empty array if no messages are found.
   */
  getAllMessage(id: string): Promise<IMessage[] | []>;

  /**
   * Deletes a message by its ID.
   *
   * @param id - The ID of the message to delete.
   * @throws {BadRequestException} - Thrown by the underlying service if the message is not found.
   * @returns {Promise<IMessage>} A promise resolving to the deleted message object with included files.
   */
  deleteMessage(id: string): Promise<IMessage>;

  /**
   * Find an images by room`s ID.
   *
   * @param id - The room`s ID.
   * @returns {Promise<IFIle[]>} A promise resolving to the array finds images object.
   */
  getAllImagesByRoom(id: string): Promise<IFile[]>;
}
