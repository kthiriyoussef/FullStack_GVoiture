import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

username!:string;
password!:string;
  user = new User();
  err : number = 0;

  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
    {
      
      this.authService.login(this.user).subscribe({
        next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/Voitures']);
        },
        error: (err: any) => {
        this.err = 1;
        }
        });
        
        
    }
    logOut(){
      this.authService.logout();
    }

  }   



