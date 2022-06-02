import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Arac } from '../models/Arac';
import { aracFoto } from '../models/aracFoto';
import { Kategori } from '../models/Kategori';
import { Kayit } from '../models/kayit';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl="http://localhost:55233/api/";
   siteUrl="http://localhost:55233/";
constructor(
  public http: HttpClient
) { }

  AracListe(){
    return this.http.get(this.apiUrl+ "aracliste");
  }

  AracById(aracId:string){
    return this.http.get(this.apiUrl+"aracbyid/"+aracId);
  }

  AracEkle(arac:Arac){
    return this.http.post(this.apiUrl+"aracekle",arac);
  }
  
  AracDuzenle(arac:Arac){
    return this.http.put(this.apiUrl+"aracduzenle",arac);
  }

  AracSil(aracId: string){
    return this.http.delete(this.apiUrl+"aracsil/" + aracId);
  }



  KategoriListe(){
    return this.http.get(this.apiUrl+"kategoriliste");
  }

  KategoriById(kategoriId: string){
    return this.http.get(this.apiUrl+"kategoribyid/"+ kategoriId);
  }

  KategoriEkle(kategori: Kategori){
    return this.http.post(this.apiUrl+"kategoriekle", kategori);
  }
  
  KategoriDuzenle(kategori: Kategori){
    return this.http.put(this.apiUrl+"kategoriduzenle", kategori);
  }

  KategoriSil(kategoriId: string){
    return this.http.delete(this.apiUrl+"kategorisil/" + kategoriId);
  }

  AracKategoriListe(kategoriId:string){
    return this.http.get(this.apiUrl+"arackategoriliste/"+ kategoriId);
  }
  KategoriAracListe(aracId:string){
    return this.http.get(this.apiUrl+"kategoriaracliste/"+ aracId);
  }
  KayitEkle(kayit: Kayit){
    return this.http.post(this.apiUrl+"kayitekle", kayit);
  }
  KayitSil(kayitId: string){
    return this.http.delete(this.apiUrl+"kayitsil/" + kayitId);
  }


  AracFotoGuncelle(aracFoto : aracFoto){
    return this.http.post(this.apiUrl+"aracfotoguncelle", aracFoto);

}
}