import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private currentUserId: string | null = null;
  private incomeEntries: {userId: string, name: string, amount: number, date: string, cate: string }[] = [
    { userId:'',name: 'Software', amount: 3000, date: '2023-07-10', cate: 'Salary'},
    { userId:'',name: 'Parties', amount: 800, date: '2023-07-09', cate: 'Gifts'},
    { userId:'',name: 'Personal', amount: 1000, date: '2023-07-09', cate: 'Pocket Money'}

  ];
  constructor() {
    this.loadFromLocalStorage();

  }

  private saveToLocalStorage(): void {
    localStorage.setItem(`incomeEntries_${this.currentUserId}`, JSON.stringify(this.incomeEntries));
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(`incomeEntries_${this.currentUserId}`);
    if (data) {
      this.incomeEntries = JSON.parse(data);
    }
  }

  setCurrentUserId(userId: string): void {
    this.currentUserId = userId;
    this.loadFromLocalStorage(); // Load income entries for the current user
  }


  setIncomeEntries(entries: { name: string, amount: number, date: string, cate: string ,userId:string}[]): void {
    this.incomeEntries = entries;
    this.saveToLocalStorage();

  }

  getIncomeEntries(): { name: string, amount: number, date: string, cate: string,userId:string }[] {
    return this.incomeEntries;
  }

  getTotalIncomeAmount(): number {
    let totalAmount = 0;
    for (const entry of this.incomeEntries) {
      totalAmount += entry.amount;
    }
    return totalAmount;
  }

  addIncomeEntry(entry: { name: string, amount: number, date: string, cate: string,userId:string }): void {
    this.incomeEntries.push(entry);
    this.saveToLocalStorage();
  }

  clearIncomeEntries(): void {
    this.incomeEntries = [];
    this.saveToLocalStorage();
  }
}