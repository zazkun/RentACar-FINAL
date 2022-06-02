import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
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
  selector: 'app-araclistele',
  templateUrl: './araclistele.component.html',
  styleUrls: ['./araclistele.component.scss']
})
export class AraclisteleComponent implements OnInit {
  kategoriler: Kategori[];
  araclar:Arac[];
  kategoriId:string;
  secArac: Arac;
  aracId: string;
  displayedColumns = ['aracAdi', 'aracPlaka','aracFiyat','aracKm','aracHiz'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: any;
  kayitlar: Kayit[];
  dialogRef: MatDialogRef<KiralaComponent>;
  ConfirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis : ApiService,
    public alert: MyAlertService,
    public route: ActivatedRoute,
    public matDialog: MatDialog

  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.aracId = p.aracId;
        this.AracGetir();
        this.KategoriListele();
        this.AracListele();
      }
    });
  }

  AracGetir() {
    this.apiServis.AracById(this.aracId).subscribe((d: Arac) => {
      this.secArac = d;
    });
  }


  KategoriListele() {
    this.apiServis.KategoriListe().subscribe((d: Kayit[]) => {
      this.kayitlar = d;
      console.log(d);
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  Ekle() {
    var yeniKayit: Kategori = new Kategori();
    this.dialogRef = this.matDialog.open(KiralaComponent, {
      width: '400px',
      data: {
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      if (d) {
        console.log(d);

        this.apiServis.KategoriEkle(d).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KategoriListele();
          }
        });
      }
    });
  }
  AracListele(){
   
      this.apiServis.AracListe().subscribe((d:Arac[])=>{
       this.araclar = d;
       this.dataSource=new MatTableDataSource(this.araclar);
      });
    
  }

}

