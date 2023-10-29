import { Injectable } from '@angular/core';

export interface Category {
  name: string;
  amount: number;

}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private currentUserId: string | null = null;
  reportAmount: number = 0;
  reportAmounts: { [category: string]: number } = {};

  categories: Category[] = [
    { name: 'Lic', amount: 900 },
    { name: 'home', amount: 2000 },
    { name: 'needs', amount: 600 }
  ];
  expenses: { name: string, amount: number, date: string, category: string }[] = [];

  constructor() {
    // Retrieve data from local storage when the service is initialized
    this.loadFromLocalStorage();
  }

  private getStorageKey(key: string): string {
    return `user_${this.currentUserId}_${key}`;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.getStorageKey('reportAmount'), this.reportAmount.toString());
    localStorage.setItem(this.getStorageKey('categories'), JSON.stringify(this.categories));
    localStorage.setItem(this.getStorageKey('expenses'), JSON.stringify(this.expenses));
  }

  private loadFromLocalStorage(): void {
    const reportAmountData = localStorage.getItem(this.getStorageKey('reportAmount'));
    if (reportAmountData) {
      this.reportAmount = Number(reportAmountData);
    }

    const categoriesData = localStorage.getItem(this.getStorageKey('categories'));
    if (categoriesData) {
      this.categories = JSON.parse(categoriesData);
    }

    const expensesData = localStorage.getItem(this.getStorageKey('expenses'));
    if (expensesData) {
      this.expenses = JSON.parse(expensesData);
    }
  }

  setCurrentUserId(userId: string): void {
    this.currentUserId = userId;
    // Update the userId for existing entries
    this.loadFromLocalStorage(); // Reload the data from local storage with the current user ID
  }

  setReportAmount(amount: number) {
    this.reportAmount = amount;
    this.saveToLocalStorage();

  }

  getReportAmount(): number {
    return this.reportAmount;

  }

  addCategory(category: Category) {
    this.categories.push(category);
    this.saveToLocalStorage();

  }

  setCategories(categories: Category[]) {
    this.categories = categories;
    this.saveToLocalStorage();

  }

  getCategories(): Category[] {
    return this.categories;

  }

  setExpenses(expenses: { name: string, amount: number, date: string, category: string }[]) {
    this.expenses = expenses;
    this.saveToLocalStorage();

  }

  getExpenses(): { name: string, amount: number, date: string, category: string }[] {
    return this.expenses;
  }
  updateCategoryAmount(categoryName: string, amount: number) {
    const category = this.categories.find(c => c.name === categoryName);
    if (category) {
      category.amount = amount;
      this.saveToLocalStorage();

    }
  }
  getReportAmountByCategory(category: string): number {
    const foundCategory = this.categories.find((cat) => cat.name === category);
    return foundCategory ? foundCategory.amount : 0; 
   }

  setReportAmountByCategory(category: string, amount: number) {
    const foundCategory = this.categories.find((cat) => cat.name === category);
    if (foundCategory) {
      foundCategory.amount = amount;
      this.saveToLocalStorage();

    }  }
}
