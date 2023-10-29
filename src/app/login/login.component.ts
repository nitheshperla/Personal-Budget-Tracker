import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupUsers:any[]=[];
 signupObj:any={username:'',email:'',password:''};

 loginObj:any={

  username:'',
  password:''
 }

 constructor(private router:Router,private renderer: Renderer2){}



  ngOnInit(): void {
    const localDate=localStorage.getItem('signupUsers');
    if(localDate!=null){
      this.signupUsers=JSON.parse(localDate);
    }
    this.renderer.setStyle(
      document.body,
      'background-image',
      'url("../../assets/images/bg5.png")'
    );
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');

  }
    onsignup(){
      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signupUsers',JSON.stringify(this.signupUsers));
      this.signupObj={username:'',email:'',password:''};


  }


  onlogin(){
    debugger
    const isuserexist=this.signupUsers.find(m=>m.username==this.loginObj.username && m.password==this.loginObj.password);
    if(isuserexist !==undefined){
      alert('Please Login ');

      if (this.loginObj.username !== '' && this.loginObj.password !== '') {
        alert('user login successfully');

        this.router.navigate(['/bussiness']); // Navigate to 'bussiness' page
      }   
     }
    else{
      alert('wrong credentials');
    }

  }

}
