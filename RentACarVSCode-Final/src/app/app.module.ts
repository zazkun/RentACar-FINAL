import { KiralamaComponent } from './components/kiralama/kiralama.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { KiralaComponent } from './components/dialogs/kirala/kirala.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { MaterialModule } from './material.module';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { FotoyukleDialogComponent } from './components/dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AracDialogComponent } from './components/dialogs/arac-dialog/arac-dialog.component';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AraclisteleComponent } from './components/araclistele/araclistele.component';
import { AracComponent } from './components/arac/arac.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    AracComponent,
    AraclisteleComponent,
    KategoriComponent,
  KiralamaComponent,    
   
  
    //Dialoglar
    AlertDialogComponent,
    AracDialogComponent,
    ConfirmDialogComponent,
    FotoyukleDialogComponent,
    KategoriDialogComponent,
    KiralaComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule

  ],
  entryComponents:[
    AlertDialogComponent,
    AracDialogComponent,
    ConfirmDialogComponent,
    FotoyukleDialogComponent,
    KategoriDialogComponent

  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
