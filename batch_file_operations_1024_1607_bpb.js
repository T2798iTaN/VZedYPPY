// 代码生成时间: 2025-10-24 16:07:32
// Ionic framework imports
const { Filesystem } = require('@ionic-native/file');
const { Injectable } = require('@angular/core');

@Injectable({
  providedIn: 'root'
})
export class FileOperationsService {

  constructor(private file: Filesystem) { }

  // Function to copy files in bulk
  copyFiles(filePaths) {
    return new Promise((resolve, reject) => {
      const operations = filePaths.map(filePath => {
        return this.file.copyFile(cordova.file.dataDirectory, filePath, cordova.file.dataDirectory, filePath);
      });

      // Execute all copy operations
      Promise.all(operations)
        .then(() => resolve('Files copied successfully.'))
        .catch(error => reject(error));
    });
  }

  // Function to move files in bulk
  moveFiles(filePaths) {
    return new Promise((resolve, reject) => {
      const operations = filePaths.map(filePath => {
        return this.file.moveFile(cordova.file.dataDirectory, filePath, cordova.file.dataDirectory, filePath);
      });

      // Execute all move operations
      Promise.all(operations)
        .then(() => resolve('Files moved successfully.'))
        .catch(error => reject(error));
    });
  }

  // Function to delete files in bulk
  deleteFiles(filePaths) {
    return new Promise((resolve, reject) => {
      const operations = filePaths.map(filePath => {
        return this.file.removeFile(cordova.file.dataDirectory, filePath);
      });

      // Execute all delete operations
      Promise.all(operations)
        .then(() => resolve('Files deleted successfully.'))
        .catch(error => reject(error));
    });
  }
}

/*
 * Usage
 *
 * const fileOps = new FileOperationsService();
 * const filePaths = ['path/to/file1.txt', 'path/to/file2.txt'];
 *
 * fileOps.copyFiles(filePaths)
 *   .then(result => console.log(result))
 *   .catch(error => console.error('Error copying files:', error));
 *
 * fileOps.moveFiles(filePaths)
 *   .then(result => console.log(result))
 *   .catch(error => console.error('Error moving files:', error));
 *
 * fileOps.deleteFiles(filePaths)
 *   .then(result => console.log(result))
 *   .catch(error => console.error('Error deleting files:', error));
 */