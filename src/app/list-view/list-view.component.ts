import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit{

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  errorMessage : string;
  notesList : Note[];
  constructor(private noteService : NotesService) {}

  ngOnInit(){
    this.noteService.getNotes().subscribe(
      notesRepsonseList =>{
     console.log(notesRepsonseList);
       //this.notesList = notesRepsonseList;
       const notStarted = [];
        const started = [];
        const completed = [];
        notesRepsonseList.map(note => {
          if (note.state === 'not-started') {
            notStarted.push(note);
          } else if (note.state === 'started') {
            started.push(note);
          } else if (note.state === 'completed') {
            completed.push(note);
          }
        });
        this.notStartedNotes = notStarted;
        this.startedNotes = started;
        this.completedNotes = completed;
      });
     }
     //error=>{
      // this.errorMessage = 'some internal error occured...'
   //});
   
   //}


}
