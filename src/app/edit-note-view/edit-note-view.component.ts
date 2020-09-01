import { Component,OnInit,Inject } from '@angular/core';
import { Note } from '../note';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit{
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  constructor( public dialogRef: MatDialogRef<EditNoteViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number, private notesService : NotesService) {
      console.log('inside edit view',data);
      this.note = this.notesService.getNoteById(data);
      console.log(this.note);

      
      
     }
     ngOnInit() {
    }

  onSave() {
    console.log('note to be updated', this.note);
    this.notesService.editNote(this.note).subscribe( res =>{

    },err =>{
      console.log(err);
      
    });
    this.dialogRef.close();

  }
}
