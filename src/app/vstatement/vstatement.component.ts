import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../service/expense.service';
import { IncomeService } from '../income.service';

@Component({
  selector: 'app-vstatement',
  templateUrl: './vstatement.component.html',
  styleUrls: ['./vstatement.component.css']
})
export class VstatementComponent implements OnInit {
  expenseEntries: { name: string, amount: number, date: string, category: string }[] = [];
  incomeEntries: { name: string, amount: number, date: string }[] = [];
  filteredExpenseEntries: { name: string, amount: number, date: string, category: string }[] = [];
  filteredIncomeEntries: { name: string, amount: number, date: string }[] = [];
  expenseSearchText: string = '';
  incomeSearchText: string = '';
  expenseStartDate: string = '';
  expenseEndDate: string = '';
  incomeStartDate: string = '';
  incomeEndDate: string = '';
  totalExpenses: number = 0;
  totalIncome: number = 0;
  netBalance: number = 0;

  constructor(private expenseService: ExpenseService, private incomeService: IncomeService) { }

  ngOnInit() {
    this.expenseEntries = this.expenseService.getExpenseEntries();
    this.incomeEntries = this.incomeService.getIncomeEntries();
    this.filteredExpenseEntries = this.expenseEntries;
    this.filteredIncomeEntries = this.incomeEntries;
    this.calculateTotals();
  }

  filterExpenseEntries() {
    this.filteredExpenseEntries = this.expenseEntries.filter((entry) =>
      this.isEntryInDateRange(entry.date, this.expenseStartDate, this.expenseEndDate) &&
      entry.name.toLowerCase().includes(this.expenseSearchText.toLowerCase())
    );
    this.calculateTotals();
  }

  filterIncomeEntries() {
    this.filteredIncomeEntries = this.incomeEntries.filter((entry) =>
      this.isEntryInDateRange(entry.date, this.incomeStartDate, this.incomeEndDate) &&
      entry.name.toLowerCase().includes(this.incomeSearchText.toLowerCase())
    );
    this.calculateTotals();
  }
    isEntryInDateRange(entryDate: string, startDate: string, endDate: string): boolean {
    if (!startDate && !endDate) {
      return true;
    }
    const entryDateTime = new Date(entryDate).getTime();
    const startDateTime = startDate ? new Date(startDate).getTime() : Number.MIN_VALUE;
    const endDateTime = endDate ? new Date(endDate).getTime() : Number.MAX_VALUE;
    return entryDateTime >= startDateTime && entryDateTime <= endDateTime;
  }
  calculateTotals() {
    this.totalExpenses = this.filteredExpenseEntries.reduce((total, entry) => total + entry.amount, 0);
    this.totalIncome = this.filteredIncomeEntries.reduce((total, entry) => total + entry.amount, 0);
    this.netBalance = this.totalIncome - this.totalExpenses;
  }
}
