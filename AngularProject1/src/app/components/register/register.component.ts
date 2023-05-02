import { AuthModel } from './../../models/auth-model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  register() {
    //Kayıt olma formu
    if (this.registerForm.valid) {
      let registerM = Object.assign({}, this.registerForm.value);
      this.authService.register(registerM).subscribe(
        (data) => {
          this.toastrService.success('Kayıt olma işleminiz tamamlanmıştır.');
          this.router.navigate(['/login']); //Kayıt olan kullanıcıyı sistem giriş sayfasına atar
          console.log(data);
        },
        (error) => {
          console.log(error); //error mesajı pop-up olarak gelir.
          this.toastrService.error('Eksik bilgi girilmiştir.'); //Eksik bilgi giren kullanıcı uyarılır
        }
      );
    }
  }
}
