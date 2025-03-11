import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../store/reducers/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5232/api/User'; // Base URL to the API

  constructor(private http: HttpClient) { }

  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /**
   * Get a single user by ID
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new user
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  /**
   * Update an existing user
   */
  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, user);
  }

  /**
   * Delete a user by ID
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}