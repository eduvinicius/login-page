import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { user } from 'src/data.mock';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  get isAuthenticatedGetter() {
    return this.isAuthenticated.asObservable();
  }

  login(email: string, password: string): void {
    // Perform authentication logic here, e.g., make an API call

    // If authentication is successful
    if ( email === user.email && password === user.password ) {
      this.isAuthenticated.next(true);
      alert("Você logou")
    } else {
      this.isAuthenticated.next(false);
      alert("Você não logou")
    }
  }

  logout(): void {
    // Perform logout logic here, e.g., invalidate tokens

    this.isAuthenticated.next(false);
  }
}
