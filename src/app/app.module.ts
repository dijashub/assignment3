import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { NotesService } from './services/notes.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ListViewComponent } from './list-view/list-view.component';
import { HeaderComponent } from './header/header.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


const appRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard],
    children: [
      {
        path: 'view/listview', component: ListViewComponent, canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'view/noteview', component: NoteViewComponent, canActivate: [CanActivateRouteGuard]
      },
      {
        path: 'note/:noteId/edit', component: EditNoteOpenerComponent, outlet: 'noteEditOutlet', canActivate: [CanActivateRouteGuard]
      },
      {
        path: '', redirectTo: 'view/noteview', pathMatch: 'full'
      }
    ]
  },
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteComponent,
    NoteTakerComponent,
    NoteViewComponent,
    EditNoteViewComponent,
    ListViewComponent,
    EditNoteOpenerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
    MatOptionModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [NotesService, AuthenticationService, RouterService, CanActivateRouteGuard,
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
  entryComponents: [EditNoteViewComponent]
})
 

export class AppModule { }
