import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IncomeService } from '../income.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.css']
})
export class BussinessComponent {
  showIncomeForm = false;

  income = { name: '', amount: 0, date: '', cate: '' };
  incomeEntries: { name: string, amount: number, date: string, cate: string, userId: string }[] = [];

     
  @ViewChild('incomeForm', { static: false })
  incomeForm!: NgForm;

 
  constructor(private incomeService: IncomeService, private authService: AuthService) {
    // Assuming you have a login mechanism that sets the currentUserId upon successful login
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      this.incomeService.setCurrentUserId(currentUserId);
    }
  }

  ngOnInit() {
  
    
    this.loadIncomeEntries();
  }

  showForm() {
    this.showIncomeForm = true;
  }

 
  submitForm() {
    if (this.incomeForm && this.incomeForm.valid) {
      if (this.income.amount <= 0) {
        alert('Income amount cannot be negative or zero');
        return;
      }
      const currentUserId = this.authService.getCurrentUserId();
      if (currentUserId) {
        const newIncomeEntry = { ...this.income, userId: currentUserId };
        this.incomeEntries.push(newIncomeEntry);
        this.incomeService.setIncomeEntries(this.incomeEntries);
  
        this.resetForm();
      } else {
        alert('User not logged in. Please log in first.'); // Show a proper message if user not logged in
      }
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  }
  

  loadIncomeEntries() {
    this.incomeEntries = this.incomeService.getIncomeEntries();
  }

  calculateIncomeAmount(): number {
    let totalAmount = 0;
    for (const entry of this.incomeEntries) {
      totalAmount += entry.amount;
    }
    return totalAmount;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.incomeForm?.controls[fieldName];
    return field?.invalid && (field?.dirty || field?.touched);
  }

  editEntry(entry: any) {
    // Remove the entry to be edited from the incomeEntries array
    const index = this.incomeEntries.indexOf(entry);
    if (index !== -1) {
      this.incomeEntries.splice(index, 1);
    }
  
    this.income = { ...entry };
    this.showIncomeForm = true;
  }
  

  deleteEntry(entry: any) {
    const index = this.incomeEntries.indexOf(entry);
    if (index !== -1) {
      this.incomeEntries.splice(index, 1);
      this.incomeService.setIncomeEntries(this.incomeEntries);
    }
  }

  resetForm() {
    this.income = { name: '', amount: 0, date: '',cate:'' };
    this.showIncomeForm = false;
  }
}