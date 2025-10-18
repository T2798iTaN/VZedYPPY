// 代码生成时间: 2025-10-18 10:17:55
import { Component } from '@angular/core';
import { IonicModule } from 'ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-switcher',
  templateUrl: './tab-switcher.component.html',
  styleUrls: ['./tab-switcher.component.scss'],
})
export class TabSwitcherComponent {
  // Define the tabs array with their respective titles and route paths
  tabs: Array<{ title: string; route: string }> = [
# TODO: 优化性能
    { title: 'Home', route: '/home' },
    { title: 'Settings', route: '/settings' },
    { title: 'Profile', route: '/profile' },
  ];

  constructor(private router: Router) {}

  // Method to handle tab selection
  onTabSelect(tab) {
    // Check if the tab is valid
    if (!tab || !tab.route) {
      console.error('Invalid tab selection:', tab);
      return;
    }

    try {
      // Navigate to the tab's route
      this.router.navigate([tab.route]);
    } catch (error) {
      // Handle any routing errors
      console.error('Error navigating to tab:', error);
    }
  }
}
