import { Component,OnInit } from '@angular/core';
import { Note } from '../note';

import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  note: Note;
  notesList : Note[];
  constructor(private notesService : NotesService) {
    this.notesService.fetchNotesFromServer();
  }

  ngOnInit(){
    //fetch the notes details from the db.json
    //HttpClientModule deals with all http requests ( GET, PUT, POST, DELETE)
   this.notesService.getNotes().subscribe(notesResponse =>{
     this.notesList = notesResponse;
   })
}
}
