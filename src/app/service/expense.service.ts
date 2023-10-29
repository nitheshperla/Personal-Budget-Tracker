import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private currentUserId: string | null = null;
  private expenseEntries: { userId: string, name: string, amount: number, date: string, category: string }[] = [
    { userId: '', name: 'insurance', amount: 900, date: '2023-07-09', category: 'Lic' },
    { userId: '', name: 'rent', amount: 2000, date: '2023-07-10', category: 'home' },
    { userId: '', name: 'groceries', amount: 600, date: '2023-07-11', category: 'needs' }
  ];
  private editedExpense: { name: string, amount: number, date: string, category: string } | null = null;

  constructor() {
    this.loadExpenseEntries(); // Load stored entries on service initialization
  }

  setCurrentUserId(userId: string): void {
    this.currentUserId = userId;
    // Update the userId for existing entries
    this.expenseEntries.forEach((entry) => (entry.userId = userId));
    this.saveExpenseEntries();
  }

  setExpenseEntries(entries: { name: string, amount: number, date: string, category: string }[]): void {
    this.expenseEntries = entries.map((entry) => ({ userId: this.currentUserId!, ...entry }));
    this.saveExpenseEntries(); // Save entries to storage
  }

  getExpenseEntries(): { name: string, amount: number, date: string, category: string }[] {
    return this.expenseEntries.filter((entry) => entry.userId === this.currentUserId);
  }

  setEditedExpense(expense: { name: string, amount: number, date: string, category: string } | null): void {
    this.editedExpense = expense;
  }

  getEditedExpense(): { name: string, amount: number, date: string, category: string } | null {
    return this.editedExpense;
  }

  editExpense(entry: any) {
    this.editedExpense = { ...entry };
  }

  deleteExpense(entry: any) {
    const index = this.expenseEntries.findIndex((e) => e.userId === this.currentUserId && e.name === entry.name && e.date === entry.date);
    if (index !== -1) {
      this.expenseEntries.splice(index, 1);
      this.saveExpenseEntries(); // Save updated entries to storage
    }
  }

  private loadExpenseEntries(): void {
    const storedEntries = localStorage.getItem(`expense_entries_${this.currentUserId}`);
    if (storedEntries) {
      this.expenseEntries = JSON.parse(storedEntries);
    }
  }

  private saveExpenseEntries(): void {
    localStorage.setItem(`expense_entries_${this.currentUserId}`, JSON.stringify(this.expenseEntries));
  }
}
