import { Component,OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit{

  notes: Array<Note>;
  errorMessage: string;
  note: Note = new Note();

  constructor(public notesservice: NotesService, private routerService: RouterService) {

    this.notesservice.getNotes().subscribe(
      response => {
        this.notes = response ;
      },
      error => {
        this.errorMessage = 'Http failure response for http://localhost:3000/notes: 404 Not Found' ;
      }
    );
  }

  ngOnInit() {}

  editNoteView(note) {
    this.routerService.routeToEditNoteView(this.note.id);
  }
}
