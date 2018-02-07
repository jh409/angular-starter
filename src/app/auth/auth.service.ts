import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as Keycloak from './keycloak';
/* istanbul ignore next */
@Injectable()
export class AuthService {
  static auth: any;

  static init(options?: any): Promise<any> {
    AuthService.auth = Keycloak({
      realm: "example",
      url: "http://localhost:8080/auth",
      clientId: "examplefrontend",
      sslRequired: "none",
      publicClient: true
    });

    return new Promise((resolve, reject) => {
      AuthService.auth.init(options)
        .success(() => {
          resolve();
        })
        .error((errorData: any) => {
          reject(errorData);
        });
    });
  }

  authenticated(): boolean {
    return AuthService.auth.authenticated;
  }

  getToken(refreshToken?: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (AuthService.auth.token) {
        AuthService.auth
          .updateToken(5)
          .success(() => {
            resolve(<string>AuthService.auth.token);
          })
          .error(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not logged in');
      }
    });
  }
}
