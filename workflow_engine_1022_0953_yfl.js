// 代码生成时间: 2025-10-22 09:53:29
// Import necessary modules and services from IONIC framework
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { WorkflowTask } from './models/workflow-task';
import { WorkflowService } from './services/workflow.service';

@Injectable({
  providedIn: 'root'
})
export class WorkflowEngine {
  private currentTaskIndex: number = 0;
  private tasks: WorkflowTask[];
  private workflowService: WorkflowService;
  private navController: NavController;

  constructor(workflowService: WorkflowService, navController: NavController) {
    this.workflowService = workflowService;
    this.navController = navController;
  }

  // Start the workflow with a list of tasks
  async startWorkflow(tasks: WorkflowTask[]): Promise<void> {
    try {
      this.tasks = tasks;
      if (!this.tasks || this.tasks.length === 0) {
        throw new Error('No tasks provided to start the workflow.');
      }

      // Execute the first task in the sequence
      await this.executeCurrentTask();
    } catch (error) {
      console.error('Error starting workflow:', error);
      // Handle error, e.g., show message to user or navigate to error page
    }
  }

  // Execute the current task in the workflow sequence
  private async executeCurrentTask(): Promise<void> {
    try {
      if (this.currentTaskIndex >= this.tasks.length) {
        throw new Error('Workflow execution completed or no more tasks to execute.');
      }

      const currentTask = this.tasks[this.currentTaskIndex];
      await this.workflowService.executeTask(currentTask);

      // Move to the next task in the sequence
      this.currentTaskIndex++;
      await this.navigateToNextTaskPage();
      if (this.currentTaskIndex < this.tasks.length) {
        // Continue with the next task if there are more tasks
        await this.executeCurrentTask();
      }
    } catch (error) {
      console.error('Error executing task:', error);
      // Handle error, e.g., show message to user or navigate to error page
    }
  }

  // Navigate to the component page for the next task
  private async navigateToNextTaskPage(): Promise<void> {
    if (this.currentTaskIndex < this.tasks.length) {
      const nextTask = this.tasks[this.currentTaskIndex];
      // Assuming 'NextTaskPageComponent' is the component for the next task
      this.navController.navigateForward('/next-task-page/' + nextTask.id);
    }
  }
}
