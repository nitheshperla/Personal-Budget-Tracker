import { Component } from '@angular/core';
import { IncomeService } from '../income.service';
import { ExpenseService } from '../service/expense.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  photoUrl: string | null = '../../assets/images/pro.webp';
  incomeAmount: number;
  expenseEntries: any[];
  remainingAmount: number;

  constructor(private incomeService: IncomeService, private expenseService: ExpenseService) {
    this.remainingAmount = 0;
  }

  ngOnInit() {
    this.incomeAmount = this.incomeService.getTotalIncomeAmount();
    this.expenseEntries = this.expenseService.getExpenseEntries();
    this.updateRemainingAmount();
  }

  calculateTotalExpenseAmount(): number {
    return this.expenseEntries.reduce((total, entry) => total + entry.amount, 0);
  }

  updateRemainingAmount() {
    this.remainingAmount = this.incomeAmount - this.calculateTotalExpenseAmount();
  }

  onPhotoUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Perform upload logic here (e.g., send file to server)
      // Once the upload is complete, update the photoUrl with the new URL
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}