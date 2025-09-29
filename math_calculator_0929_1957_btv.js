// 代码生成时间: 2025-09-29 19:57:30
// Importing necessary Ionic components
import { Component } from '@angular/core';

@Component({
  selector: 'math-calculator',
  templateUrl: 'math-calculator.html',
  styleUrls: ['math-calculator.css']
})
export class MathCalculator {
  // Display variables for result and error messages
  result: number = 0;
  error: string = '';

  // Function to perform addition
  add(a: number, b: number): void {
    try {
      this.result = a + b;
      this.error = '';
    } catch (e) {
      this.error = 'Error adding numbers';
    }
  }

  // Function to perform subtraction
  subtract(a: number, b: number): void {
    try {
      this.result = a - b;
      this.error = '';
    } catch (e) {
      this.error = 'Error subtracting numbers';
    }
  }

  // Function to perform multiplication
  multiply(a: number, b: number): void {
    try {
      this.result = a * b;
      this.error = '';
    } catch (e) {
      this.error = 'Error multiplying numbers';
    }
  }

  // Function to perform division
  divide(a: number, b: number): void {
    try {
      if (b === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      this.result = a / b;
      this.error = '';
    } catch (e) {
      this.error = e.message;
    }
  }

  // Function to handle input validation before performing operations
  validateInput(a: number, b: number): boolean {
    if (isNaN(a) || isNaN(b)) {
      this.error = 'Please enter valid numbers';
      return false;
    }
    return true;
  }
}

/*
 * Template for the Math Calculator component (math-calculator.html)
 */

/* html
<ion-header>
  <ion-toolbar>
    <ion-title>Math Calculator</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="ion-padding">
    <ion-item>
      <ion-label position="floating">Number 1</ion-label>
      <ion-input [(ngModel)]="num1"></ion-input>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Number 2</ion-label>
      <ion-input [(ngModel)]="num2"></ion-input>
    </ion-item>

    <ion-row>
      <ion-col size="6">
        <ion-button (click)="add(num1, num2)" expand="block">Add</ion-button>
      </ion-col>
      <ion-col size="6">
        <ion-button (click)="subtract(num1, num2)" expand="block">Subtract</ion-button>
      </ion-col>
      <ion-col size="6">
        <ion-button (click)="multiply(num1, num2)" expand="block">Multiply</ion-button>
      </ion-col>
      <ion-col size="6">
        <ion-button (click)="divide(num1, num2)" expand="block">Divide</ion-button>
      </ion-col>
    </ion-row>

    <ion-item>
      <ion-label>Result</ion-label>
      <ion-text color="success">{result}</ion-text>
    </ion-item>

    <ion-item *ngIf="error" lines="none">
      <ion-label color="danger">{error}</ion-label>
    </ion-item>
  </div>
</ion-content>
*/

/*
 * Style for the Math Calculator component (math-calculator.css)
 */

/* css
ion-content {
  --background: var(--ion-color-light);
}
ion-item {
  --background: transparent;
}
ion-button {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}
ion-button:hover {
  --background: var(--ion-color-primary-shade);
}
*/