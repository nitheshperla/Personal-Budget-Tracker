import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile2',
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component implements OnInit {
  photoUrl: string | null = '../../assets/images/pro.webp';
  currentUser: any;
  editedUser: any;
  editMode: boolean = false;
  isLoggedIn: boolean = false;
  users: any[];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    this.users = this.userService.getUsers();
    const currentUserJson = localStorage.getItem('currentUser');
    this.currentUser = currentUserJson ? JSON.parse(currentUserJson) : null;
    this.isLoggedIn = !!this.currentUser; // Check if the user is logged in
  }

  logout() {
    // Clear the user info from local storage and set isLoggedIn to false
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;

    // Navigate to the login page after logout
    this.router.navigate(['/login2']);
  }

  editProfile() {
    this.editMode = true;
    // Create a copy of the currentUser object for editing
    this.editedUser = { ...this.currentUser };
  }

  saveProfile() {
    this.currentUser = this.editedUser; // Update the currentUser with the editedUser data
    this.editMode = false;

    // Save the updated user data back to local storage
    const currentUserJson = JSON.stringify(this.currentUser);
    localStorage.setItem('currentUser', currentUserJson);

    // Save the updated user data to the UserService
    const userIndex = this.users.findIndex(user => user.id === this.currentUser.id);
    if (userIndex !== -1) {
      this.users[userIndex] = this.currentUser;
      this.userService.saveUsers(this.users);
    }
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
