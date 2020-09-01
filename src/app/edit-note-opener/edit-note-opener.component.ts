import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  //noteId should be fetched from the path parameter
  noteId: number;
  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private router: RouterService) {

    this.activatedRoute.params.forEach(params => this.noteId = params.noteId);


    this.dialog.open(EditNoteViewComponent, {
      data: this.noteId
    }).afterClosed().subscribe(result => {
      this.router.routeToDashboard();
    })
  }

  ngOnInit() {
  }

}
