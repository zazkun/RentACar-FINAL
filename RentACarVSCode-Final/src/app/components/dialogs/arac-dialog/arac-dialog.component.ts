import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef,MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Arac } from 'src/app/models/Arac';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-arac-dialog',
  templateUrl: './arac-dialog.component.html',
  styleUrls: ['./arac-dialog.component.scss']
})
export class AracDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  frm:FormGroup;
  yeniKayit:Arac;
  kategoriler:Kategori[];
  kategoriId:string;
  
    constructor(
      public apiServis:ApiService,
      public MatDialog:MatDialog,
      public frmBuild:FormBuilder,
      public dialogRef:MatDialogRef<AracDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) { 
  
      this.islem=data.islem;
      this.yeniKayit=data.kayit;
      if (this.islem=='ekle'){
        this.dialogBaslik="Araç Ekle";
      }
      if (this.islem=='duzenle'){
        this.dialogBaslik="Araç Düzenle";
      }
      this.frm=this.FormOlustur();
    }
  
    ngOnInit() {
      this.KategoriListele();
    }
    FormOlustur(){
      return this.frmBuild.group({
        aracAdi:[this.yeniKayit.aracAdi],
        aracPlaka:[this.yeniKayit.aracPlaka],
        aracFiyat:[this.yeniKayit.aracFiyat],
        aracKm:[this.yeniKayit.aracKm],
        aracHiz:[this.yeniKayit.aracHiz],
      });
    }
  
    KategoriListele(){
      this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
        this.kategoriler=d;
      });
    }
    KategoriSec(kategori:Kategori){
      this.kategoriId = kategori.kategoriId;
    }
    
  }
  