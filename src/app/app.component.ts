import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean = false;
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Check if a user is logged in (available in AuthService)
    this.isLoggedIn = this.authService.isLoggedIn();

    this.renderer.setStyle(document.body, 'background-image', 'url("../../assets/images/bg5.png")');
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (loggedIn) => {
        if (loggedIn) {
        

          // Set the isLoggedIn property to true
          this.isLoggedIn = true;

          // Navigate to the profile page after login
          this.router.navigate(['/bussiness']);
        } else {
          // Login failed
          alert('Invalid username or password');
          this.isLoggedIn = false;
        }

        // Reset the form fields
        this.username = '';
        this.password = '';
      },
      (error) => {
        // Handle any errors during the login process
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
        this.isLoggedIn = false;
      }
    );
    
  }

  logout() {
    // Call the logout method of the AuthService to handle logout
    this.authService.logout();
    this.isLoggedIn = false;

    // Navigate to the login page after logout
    this.router.navigate(['/AppComponent']);
  }
}
