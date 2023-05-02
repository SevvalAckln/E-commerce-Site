import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    //Giriş yapma fonksiyonu
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (data) => {
          this.router.navigate(['/**']); //Bilgiler doğru girilirse yönlendirilecek sayfa
          this.toastrService.info('Giriş yapıldı.'); //Pop-up bildirimiyle kullanıcı bilgilendirilir.
        },
        (error) => {
          console.log(error);
          this.toastrService.error('Hatalı giriş yapıldı.'); //Hatalı giriş yapılırsa aynı şekilde kullanıcı uyarılır.
        }
      );
    }
  }
}
