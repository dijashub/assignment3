import { Component } from '@angular/core';
import { Note } from '../note';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { RouterService } from '../services/router.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input()
  note: Note;
  constructor(private routerService: RouterService) { }

  ngOnInit() {

  }

  editNoteView() {
    this.routerService.routeToEditNoteView(this.note.id);
  }
}
