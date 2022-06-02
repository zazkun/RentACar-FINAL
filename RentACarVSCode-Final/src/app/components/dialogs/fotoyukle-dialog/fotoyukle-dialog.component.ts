import { aracFoto } from './../../../models/aracFoto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Arac } from 'src/app/models/Arac';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.scss']
})
export class FotoyukleDialogComponent implements OnInit {
  secilenFoto: any;
  aracFoto:aracFoto=new aracFoto();
  secArac:Arac;
  constructor(
    public fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public apiServis:ApiService


  ) {
    this.secArac=this.data;
   }

  ngOnInit() {
  }
  FotoSec(e){
    var fotolar=e.target.files;
    var foto=fotolar[0];

    var fr=new FileReader();
    fr.onloadend=()=>{
      this.secilenFoto=fr.result;
      this.aracFoto.fotoData=fr.result.toString();
      this.aracFoto.fotoUzanti=foto.type;
    };
    fr.readAsDataURL(foto);
  }
}

