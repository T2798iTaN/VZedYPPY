// 代码生成时间: 2025-10-11 22:32:44
 * It handles errors gracefully and is structured for maintainability and extensibility.
 */

// Import necessary Ionic modules
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class GameSaveService {
  private saveKey = 'game_save';
  private saveVersionKey = 'save_version';

  constructor(private storage: Storage) { }

  /**
   * Saves the game progress to local storage.
   * @param {any} saveData The game progress data to be saved.
   * @returns {Promise<void>} A promise that resolves when the save is complete.
   */
  async saveGameProgress(saveData: any): Promise<void> {
    try {
      // Save the current version for future compatibility checks
      await this.storage.set(this.saveVersionKey, '1.0');
      // Save the game progress data
      await this.storage.set(this.saveKey, JSON.stringify(saveData));
    } catch (error) {
      // Handle errors gracefully
      console.error('Error saving game progress:', error);
      throw new Error('Failed to save game progress');
    }
  }

  /**
   * Loads the game progress from local storage.
   * @returns {Promise<any>} A promise that resolves with the saved game progress data.
   */
  async loadGameProgress(): Promise<any> {
    try {
      // Check the version and handle if needed
      const saveVersion = await this.storage.get(this.saveVersionKey);
      if (saveVersion !== '1.0') {
        throw new Error('Save version mismatch. Please load the correct save version.');
      }
      // Load the game progress data
      const saveData = await this.storage.get(this.saveKey);
      if (saveData === null) {
        throw new Error('No game progress found.');
      }
      return JSON.parse(saveData);
    } catch (error) {
      // Handle errors gracefully
      console.error('Error loading game progress:', error);
      throw new Error('Failed to load game progress');
    }
  }

  /**
   * Clears the saved game progress.
   * @returns {Promise<void>} A promise that resolves when the clear operation is complete.
   */
  async clearGameProgress(): Promise<void> {
    try {
      await this.storage.remove(this.saveKey);
      await this.storage.remove(this.saveVersionKey);
    } catch (error) {
      // Handle errors gracefully
      console.error('Error clearing game progress:', error);
      throw new Error('Failed to clear game progress');
    }
  }
}