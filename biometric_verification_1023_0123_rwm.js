// 代码生成时间: 2025-10-23 01:23:45
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Biometric } from '@ionic-native/biometric/ngx';
import { IonicNativePlugin } from '@ionic-native/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BiometricVerificationService implements IonicNativePlugin {
  // 构造函数
  constructor(private biometric: Biometric, private platform: Platform) {
    // 确保平台已准备好
    this.platform.ready().then(() => {
      // 初始化生物识别插件
      this.biometric.init({
        // 可以在这里配置插件的相关参数
      });
    });
  }

  // 方法：执行生物识别验证
  async isUserAuthenticated(): Promise<boolean> {
    try {
      // 检查是否支持生物识别
      if (!this.biometric.isAvailable()) {
        throw new Error('Biometric authentication is not available');
      }
      
      // 执行生物识别验证
      const isMatch = await this.biometric.show({
        lock: true, // 锁定应用直到验证通过
        disableBackButton: true, // 禁用返回按钮
        androidDisableAnimations: true, // Android不显示动画
        title: 'Biometric Authentication', // 标题
        subtitle: 'Scan your fingerprint to authenticate', // 副标题
        keepApplicationAlive: true, // 保持应用活动状态
        locale: 'en-US', // 地区设置
      });
      return isMatch;
    } catch (error) {
      // 错误处理
      console.error('Biometric verification failed:', error);
      return false;
    }
  }

  // 方法：检查生物识别是否可用
  async checkAvailability(): Promise<boolean> {
    try {
      return await this.biometric.isAvailable();
    } catch (error) {
      // 错误处理
      console.error('Error checking biometric availability:', error);
      return false;
    }
  }
}

/*
 * 这个服务提供了生物识别验证的功能。
 * 它首先检查生物识别是否可用，然后执行验证。
 * 如果验证成功，返回true，否则返回false。
 * 错误处理确保了任何异常都被捕捉并记录。
 */