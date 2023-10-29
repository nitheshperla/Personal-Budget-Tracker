import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component {
//   constructor(private router: Router, private http: HttpClient) {}

//   username: string = '';
//   password: string = '';

//   login() {
//     console.log('Login button clicked.');

//     // Fetch customers data from the JSON file
//     this.http.get<any[]>('../../assets/customers.json').subscribe(
//       (customersData: any[]) => {
//         const matchedUser = customersData.find((user: any) => user.name === this.username && user.password === this.password);

//         if (matchedUser) {
//           // Login successful
//           alert('Login successful');

//           // Set the login status in the AuthService

//           // Navigate to the profile page after login
//           this.router.navigateByUrl('/bussiness');
//         } else {
//           // Login failed
//           alert('Invalid Credentials');
//         }

//         // Reset the form fields
//         this.username = '';
//         this.password = '';
//       },
      
//     );
//   }

//   logout() {
//     // Clear the session and navigate to the login page after logging out
//     this.router.navigate(['/login2']);
//   }
// }
}