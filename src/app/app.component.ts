import { AuthenticationResult } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

//importaciones para Interceptor
import { HttpClient } from '@angular/common/http';

//importar Sweetalert2
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'My Microsoft Login- Example';

  apiResponse: string;

  constructor(private authService: MsalService, private http: HttpClient) {

  }
  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then( res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
      }
    })
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null
  }

  login() {
    // this.authService.loginRedirect();


    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
      });
  }

  getName () : string {
    if (this.authService.instance.getActiveAccount() == null) {
      return 'unknown'
    }

    return this.authService.instance.getActiveAccount().name
  }

  logout() {
    this.authService.logout()
  }

  callProfile () {
    this.http.get("https://graph.microsoft.com/v1.0/me").subscribe( resp  => {
      this.apiResponse = JSON.stringify(resp);
      console.log(resp);
      
    })

    
  }



}
