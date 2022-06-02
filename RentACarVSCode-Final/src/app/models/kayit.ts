import { Kategori } from 'src/app/models/Kategori';
import { Arac } from 'src/app/models/Arac';
export class Kayit {
    kayitId:string;
    kayitKategoriId:string;
    kayitAracId:string;
    aracBilgi:Arac;
    kategoriBilgi: Kategori;
}