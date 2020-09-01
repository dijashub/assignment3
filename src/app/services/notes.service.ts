import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;

  constructor(private http: HttpClient, private authService: AuthenticationService) {
    this.notes = [];
    this.notesSubject = new BehaviorSubject([]);
    this.fetchNotesFromServer();
  }

  
  fetchNotesFromServer() {
    this.http.get<Note[]>('http://localhost:3000/api/v1/notes', {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
  }).subscribe(notesResponse => {
      this.notes = notesResponse;
      this.notesSubject.next(this.notes);
  }, err => {

  });
}

getNotes(): BehaviorSubject<Note[]> {
  return this.notesSubject;
}

addNote(note: Note): Observable<Note> {
  return this.http.post<Note>('http://localhost:3000/api/v1/notes', note, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
  }).pipe(
    tap(addedNote => {
      this.notes.push(addedNote);
    this.notesSubject.next(this.notes);
  })
);
}

editNote(updatedNote: Note) {
  return this.http.put(`http://localhost:3000/api/v1/notes/${updatedNote.id}`, updatedNote, {
    headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getBearerToken()}`)
  }).pipe(
    tap(editedNote => {
      // this.notes.push(addedNote);
      const foundNote = this.notes.find(note => note.id === updatedNote.id);
      Object.assign(foundNote, editedNote);
      this.notesSubject.next(this.notes);
    })
    );
}

  getNoteById(noteId): Note {
    return this.notes.find(note => note.id == noteId );
}
}
