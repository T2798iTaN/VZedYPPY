// 代码生成时间: 2025-11-02 15:11:07
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

// 定义多媒体转码器服务
@Injectable({
  providedIn: 'root'
})
export class MediaTranscoderService {
  constructor(private http: HttpClient) {}

  // 转码多媒体文件
  // file: 要转码的文件对象
  // format: 目标格式，例如 'mp4'
  // 返回一个Observable，其中包含转码后的文件URL或者错误信息
  encodeMediaFile(file: File, format: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('format', format);

    return this.http.post<any>('https://api.example.com/transcode', formData, {
      reportProgress: true, // 启用进度报告
      observe: 'events'       // 观察事件（例如进度事件）
    }).pipe(
      catchError(this.handleError) // 错误处理
    );
  }

  // 处理HTTP错误
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // 客户端或网络错误发生时的错误处理
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // 服务器返回的错误处理
      errorMessage = `Error Code: ${error.status}
       Message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

// 使用 MediaTranscoderService
// 假设我们有一个组件，其中包含上传和转码多媒体文件的功能
import { Component } from '@angular/core';
import { MediaTranscoderService } from './media_transcoder.service'; // 导入服务

@Component({
  selector: 'app-media-uploader',
  templateUrl: './media-uploader.component.html',
  styleUrls: ['./media-uploader.component.scss']
})
export class MediaUploaderComponent {
  constructor(private mediaTranscoder: MediaTranscoderService) {}

  // 上传并转码多媒体文件
  uploadFile(file: File): void {
    const format = 'mp4'; // 假设目标格式为mp4
    this.mediaTranscoder.encodeMediaFile(file, format).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(`Transcoding progress: ${percentDone}%`);
        } else if (event instanceof HttpResponse) {
          console.log('Successfully transcoded media file: ', event.body.url);
        }
      },
      error: (error) => {
        console.error('Transcoding error: ', error);
      }
    });
  }
}
