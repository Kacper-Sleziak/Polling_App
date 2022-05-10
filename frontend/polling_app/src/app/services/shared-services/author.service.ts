import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  author: number = -1;
  constructor() {}

  setAuthor(author: number) {
    this.author = author;
  }
  getAuthor(): number {
    return this.author;
  }
}
