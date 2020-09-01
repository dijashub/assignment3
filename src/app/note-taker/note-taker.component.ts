import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit{

  errorMessage: string;
  note: Note = new Note();
  notes: Array<Note> = [];
  constructor(public notesservice: NotesService) { }

  ngOnInit() { }

  addNote() {
    if (this.note.title === '' || this.note.text === '') {
      this.errorMessage = 'Title and Text both are required fields';
    } else {
      this.notes.push(this.note);
      this.notesservice.addNote(this.note).subscribe(
        data => { },
        err => {
          const noteIndex: number = this.notes.findIndex(note => note.title === this.note.title);
          this.notes.splice(noteIndex, 1);
          this.errorMessage = 'Http failure response for http://localhost:3000/api/v1/notes: 404 Not Found';
        }
      );
      // clear the input fields
      this.note = new Note();
    }
    
  }
}
