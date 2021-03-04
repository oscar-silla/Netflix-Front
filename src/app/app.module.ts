// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// External Modules
import { NgxPaginationModule } from 'ngx-pagination';

// Services
import { ElementService } from './services/element.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { FilmsComponent } from './pages/films/films.component';
import { NewsComponent } from './pages/news/news.component';
import { SeriesComponent } from './pages/series/series.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FormCreateComponent } from './components/admin/form-create/form-create.component';
import { ListViewComponent } from './components/admin/list-view/list-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './components/admin/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FilmsComponent,
    NewsComponent,
    SeriesComponent,
    NotFoundComponent,
    AdminComponent,
    FormCreateComponent,
    ListViewComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [ElementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
