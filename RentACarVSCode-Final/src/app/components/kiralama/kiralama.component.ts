import { FotoyukleDialogComponent } from './../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { AracDialogComponent } from './../dialogs/arac-dialog/arac-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Arac } from 'src/app/models/Arac';
import { Kategori } from 'src/app/models/Kategori';
import { Kayit } from 'src/app/models/kayit';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { KiralaComponent } from '../dialogs/kirala/kirala.component';

@Component({
  selector: 'app-kiralama',
  templateUrl: './kiralama.component.html',
  styleUrls: ['./kiralama.component.css']
})
export class KiralamaComponent implements OnInit {
  araclar:Arac[];
  displayedColumns=['aracFoto','aracAdi','aracFiyat','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<AracDialogComponent>;
  fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.AracListele();
  }
 AracListele(){
   this.apiServis.AracListe().subscribe((d:Arac[])=>{
    this.araclar = d;
    this.dataSource=new MatTableDataSource(this.araclar);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
   });
 }

 Filtrele(e){
  var deger=e.target.value;
  this.dataSource.filter=deger.trim().toLowerCase();
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
 }

 Ekle(){
   var yeniKayit:Arac=new Arac();
   this.dialogRef=this.matDialog.open(AracDialogComponent,{
     width:'400px',
     data:{
       kayit:yeniKayit,
       islem:'ekle'
     }
   });

   this.dialogRef.afterClosed().subscribe(d=>{
     if(d){
      this.apiServis.AracEkle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
        this.AracListele();
      }
    });
    }
   });

  }
  Duzenle(kayit:Arac){
    this.dialogRef=this.matDialog.open(AracDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem:'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
      kayit.aracAdi=d.aracAdi;
      kayit.aracPlaka=d.aracPlaka;
      kayit.aracFiyat=d.aracFiyat;
      kayit.aracKm=d.aracKm;
      kayit.aracHiz=d.aracHiz;

      this.apiServis.AracDuzenle(kayit).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
      });
      }

     });
    }
     
    
    Sil(kayit: Arac){
  this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
    width:'600px'
  }); 

  this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.aracAdi + "  " + kayit.aracPlaka + "  --> Numaralı Arac Silinecektir Onaylıyor Musunuz ?"

  this.ConfirmDialogRef.afterClosed().subscribe(d=>{
    if (d){
      this.apiServis.AracSil(kayit.aracId).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.AracListele();
        }
      })
    }
  });
  }


  
 
}
