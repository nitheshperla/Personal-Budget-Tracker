import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IncomeService } from '../income.service';
import { ExpenseService } from '../service/expense.service';
import { ReportService, Category } from '../report.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-texpenses',
  templateUrl: './texpenses.component.html',
  styleUrls: ['./texpenses.component.css']
})
export class TexpensesComponent implements OnInit {
  showExpenseForm = false;
  expense: { name: string, amount: number, date: string, category: string } = { name: '', amount: 0, date: '', category: '' };
  expenseEntries: { name: string, amount: number, date: string, category: string }[] = [];
  incomeAmount: number;
  searchCategory: string = '';
  filteredExpenseEntries: any[] = [];
  remainingAmount: number;
  categories: Category[] = [];
  selectedCategory: string = '';

  constructor(
    private incomeService: IncomeService,
    private expenseService: ExpenseService,
    private reportService: ReportService,
    private authService: AuthService // Inject the AuthService
  ) {
    this.incomeAmount = 0;
    this.expenseEntries = [
      { name: 'insurance', amount: 900, date: '2023-07-09', category: 'Lic' },
      { name: 'rent', amount: 2000, date: '2023-07-10', category: 'home' },
      { name: 'groceries', amount: 600, date: '2023-07-11', category: 'needs' }
    ];
    this.remainingAmount = 0;
  }

  ngOnInit() {
    this.updateIncomeAmount();
    const storedExpenseEntries = this.expenseService.getExpenseEntries();

    // Filter and add stored expense entries that don't already exist
    for (const entry of storedExpenseEntries) {
      const exists = this.expenseEntries.some(existingEntry =>
        entry.name === existingEntry.name && entry.date === existingEntry.date
      );
      if (!exists) {
        this.expenseEntries.push({ ...entry });
      }
    }

    this.filterExpenseEntries();
    this.updateRemainingAmount();
    this.categories = this.reportService.getCategories();

    // Set the current user ID in the ExpenseService
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      this.expenseService.setCurrentUserId(currentUserId);
    }
  }

  updateIncomeAmount() {
    this.incomeAmount = this.incomeService.getTotalIncomeAmount();
  }


 
  onSubmit(expenseForm: NgForm) {
    if (expenseForm.valid) {
      if (this.expense.amount <= 0) {
        alert('Expense amount cannot be zero or negative. Please enter a valid amount.');
        return;
      }

      const totalExpenseAmount = this.cal() + this.expense.amount;
      const reportAmount = this.reportService.getReportAmountByCategory(this.selectedCategory);
      if (this.expense.amount > reportAmount) {
        alert('Amount exceeds the budget goal');
        return;
      }
      if (totalExpenseAmount > this.incomeAmount) {
        alert('Expense amount exceeds the income amount.');
        return;
      }
      this.expense.category = this.selectedCategory;

      // Add the expense to the expenseEntries array
      this.expenseEntries.push({ ...this.expense });

      // Update the stored expense entries
      this.expenseService.setExpenseEntries(this.expenseEntries);

      // Update the reported amount for thae selected category
      // this.reportService.setReportAmountByCategory(this.selectedCategory, totalExpenseAmount);

      // Reset the form and update the remaining amount
      expenseForm.resetForm();
      this.updateRemainingAmount();
      this.filterExpenseEntries();
    } else {
      alert('Please fill in all the required fields correctly.');
    }
  }
  editExpense(entry: any) {
    const index = this.expenseEntries.indexOf(entry);
    if (index !== -1) {
      this.expenseEntries.splice(index, 1);
    }
  
        this.expense = { ...entry };
    this.showExpenseForm = true;
  }

  deleteExpense(entry: any) {
    const index = this.expenseEntries.indexOf(entry);
    if (index !== -1) {
      this.expenseEntries.splice(index, 1);
      this.filteredExpenseEntries = this.filteredExpenseEntries.filter(
        filteredEntry => filteredEntry !== entry
      );
      this.expenseService.setExpenseEntries(this.expenseEntries);

      
      this.updateRemainingAmount();
    }
  }


  resetForm() {
    this.expense = { name: '', amount: 0, date: '', category: '' };
    this.showExpenseForm = false;
  }

  searchByCategory() {
    this.filterExpenseEntries();
  }

  filterExpenseEntries() {
    if (this.searchCategory) {
      this.filteredExpenseEntries = this.expenseEntries.filter(entry =>
        entry.category.toLowerCase().includes(this.searchCategory.toLowerCase()) ||
        entry.name.toLowerCase().includes(this.searchCategory.toLowerCase()) ||
        entry.amount.toString().includes(this.searchCategory.toLowerCase()) ||
        entry.date.toString().includes(this.searchCategory.toLowerCase())
      );
    } else {
      this.filteredExpenseEntries = [...this.expenseEntries];
    }
  }

  cal(): number {
    let total = 0;
    for (const entry of this.expenseEntries) {
     
        total += entry.amount;
      
    }
    return total;
  }
  updateRemainingAmount() {
    let totalExpenses = 0;
    for (const entry of this.expenseEntries) {
      totalExpenses += entry.amount;
    }
    this.remainingAmount = this.incomeAmount - totalExpenses;
  }
}