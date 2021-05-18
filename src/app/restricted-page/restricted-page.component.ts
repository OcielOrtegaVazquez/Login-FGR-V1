import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

//importacion para Interceptor
import { AuthenticationResult } from '@azure/msal-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restricted-page',
  templateUrl: './restricted-page.component.html',
  styleUrls: ['./restricted-page.component.css']
})
export class RestrictedPageComponent implements OnInit {

  apiResponse: string;

  constructor(private authService: MsalService, private http: HttpClient) {

   }

  getName () : string {
    if (this.authService.instance.getActiveAccount() == null) {
      return 'unknown'
    }

    return this.authService.instance.getActiveAccount().name
  }

  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then( res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
      }
    })
  }

  callProfile () {
    this.http.get("https://graph.microsoft.com/v1.0/me").subscribe( resp  => {
      this.apiResponse = JSON.stringify(resp)
      console.log(resp);
    })
  }

}
