import { Component, OnInit } from '@angular/core';
import { ReportService, Category } from '../report.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: string = '';
  categoryAmount: number = 0;
  newCategory: string = '';
  reportAmount: number = 0;
  expense: { name: string, amount: number, date: string, category: string } = {
    name: '',
    amount: 0,
    date: '',
    category: ''
  };
  expenses: { name: string, amount: number, date: string, category: string }[] = [];

  constructor(private reportService: ReportService,  private authService: AuthService  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadExpenses();
    this.updateReportAmount();

    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId) {
      this.reportService.setCurrentUserId(currentUserId); // Use reportService instead of categories
    }
  }

  onSubmit() {
    const newCategory: Category = {
      name: this.selectedCategory,
      amount: this.categoryAmount
    };
    this.categories.push(newCategory);
    this.selectedCategory = '';
    this.categoryAmount = 0;
    this.saveCategories();

    // Update the report amount
    this.updateReportAmount();

    // Check if the expense amount is greater than the report amount
    if (this.expense.amount > this.reportAmount) {
      alert('Expense amount exceeds report amount');
      return;
    }

   // Add the expense to the list of expenses
    this.expenses.push(this.expense);
    this.saveExpenses();
  }

  addCategory() {
    if (this.newCategory.trim() !== '') {
      const trimmedCategory = this.newCategory.trim();
      const existingCategory = this.categories.find(category => category.name === trimmedCategory);
  
      if (existingCategory) {
        alert('Category already exists.');
        return;
      }
  
      const newCategory: Category = {
        name: trimmedCategory,
        amount: 0
      };
  
      // Update the categories in the expense component
      this.reportService.addCategory(newCategory);
      this.newCategory = '';
    }
  }
  

  updateReportAmount() {
    let total = 0;
    for (const entry of this.categories) {
      total += entry.amount;
    }
    this.reportAmount = total ;
    this.reportService.setReportAmount(total);
  }
  

  saveCategories() {
    this.reportService.setCategories(this.categories);
  }

  loadCategories() {
    this.categories = this.reportService.getCategories();
  }
  

  saveExpenses() {
    this.reportService.setExpenses(this.expenses);
  }

  loadExpenses() {
    this.expenses = this.reportService.getExpenses();
  }



  editCategory(category: Category) {
    const index = this.categories.findIndex(c => c === category);
    if (index !== -1) {
      const newName = prompt('Enter the new name for the category:', category.name);
      const amountInput = prompt('Enter the new amount for the category:', category.amount.toString());
      if (newName && amountInput !== null) {
        const newAmount = parseFloat(amountInput);
        if (!isNaN(newAmount)) {
          this.categories[index].name = newName;
          this.categories[index].amount = newAmount;
          this.saveCategories();
          this.updateReportAmount();
        } else {
          alert('Invalid amount. Category edit was canceled.');
        }
      } else {
        alert('Invalid input. Category edit was canceled.');
      }
    }
  }


  deleteCategory(category: Category) {
    const index = this.categories.findIndex(c => c === category);
    if (index !== -1) {
      this.categories.splice(index, 1);
      this.saveCategories();
      this.updateReportAmount();
  
      // Remove the deleted category from the dropdown selection
      if (this.selectedCategory === category.name) {
        this.selectedCategory = '';
      }
    }
  }
}