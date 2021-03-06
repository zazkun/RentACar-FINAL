using RentACar1.Models;
using RentACar1.ViewModel;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RentACar1.Controllers
{
    public class ServisController : ApiController
    {
        DB01Entities db = new DB01Entities();
        SonucModel sonuc = new SonucModel();



        [HttpGet]
        [Route("api/aracliste")]
        public List<AracModel> AracListe()
        {
            List<AracModel> liste = db.Arac.Select(x => new AracModel()
            {
                aracId = x.aracId,
                aracAdi = x.aracAdi,
                aracFiyat = x.aracFiyat,
                aracFoto = x.aracFoto,
                aracHiz = x.aracHiz,
                aracKm = x.aracKm,
                aracPlaka = x.aracPlaka,

            }).ToList();
            return liste;
        }

        [HttpGet]
        [Route("api/aracbyid/{aracId}")]
        public AracModel AracById(string aracId)
        {
            AracModel kayit = db.Arac.Where(s => s.aracId == aracId).Select(x => new AracModel()
            {
                aracId = x.aracId,
                aracAdi = x.aracAdi,
                aracFiyat = x.aracFiyat,
                aracFoto = x.aracFoto,
                aracHiz = x.aracHiz,
                aracKm = x.aracKm,
                aracPlaka = x.aracPlaka,
                AracSayisi = x.Kayit.Count(),

            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/aracekle")]
        public SonucModel AracEkle(AracModel model)
        {
            if (db.Arac.Count(s => s.aracPlaka == model.aracPlaka) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Araç Plaka Kayıtlıdır!";
                return sonuc;
            }
            Arac yeni = new Arac();
            yeni.aracId = Guid.NewGuid().ToString();
            yeni.aracAdi = model.aracAdi;
            yeni.aracPlaka = model.aracPlaka;
            yeni.aracFiyat = model.aracFiyat;
            yeni.aracFoto = "profil.jpg";
            yeni.aracHiz = model.aracHiz;
            yeni.aracKm = model.aracKm;
            db.Arac.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Araç Eklendi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/aracduzenle")]
        public SonucModel AracDuzenle(AracModel model)
        {
            Arac kayit = db.Arac.Where(s => s.aracId == model.aracId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.aracAdi = model.aracAdi;
            kayit.aracPlaka = model.aracPlaka;
            kayit.aracFiyat = model.aracFiyat;
            kayit.aracHiz = model.aracHiz;
            kayit.aracKm = model.aracKm;
            kayit.aracFoto = model.aracFoto;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Kaydı Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/aracsil")]
        public SonucModel AracSil(string aracId)
        {
            Arac kayit = db.Arac.Where(s => s.aracId == aracId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Arac.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Kaydı Silindi";
            return sonuc;
        }


        [HttpPost]
        [Route("api/aracfotoguncelle")]

        public SonucModel AracFotoGuncelle(aracFotoModel model)
        {


            Arac arac = db.Arac.Where(s => s.aracId == model.aracId).SingleOrDefault();
            if (arac == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (arac.aracFoto != "profil1.jpg")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Folders/" + arac.aracFoto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }


            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgbytes = Convert.FromBase64String(base64);
            string dosyaAdi = arac.aracId + model.fotoUzanti.Replace("image/", ".");
            using (var ms = new MemoryStream(imgbytes, 0, imgbytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Folders/" + dosyaAdi));
            }

            arac.aracFoto = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Fotoğraf Güncellendi";


            return sonuc;

        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(x => x.kategoriAdi == model.kategoriAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Kayıtlıdır!";
                return sonuc;
            }

            Kategori yeni = new Kategori();
            yeni.kategoriId = Guid.NewGuid().ToString();
            yeni.kategoriAdi = model.kategoriAdi;


            db.Kategori.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;
        }


        [HttpGet]
        [Route("api/kategoribyid/{kategoriId}")]
        public KategoriModel KategoriById(string kategoriId)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.kategoriId == kategoriId).Select(x => new KategoriModel()
            {
                kategoriId = x.kategoriId,
                kategoriAdi = x.kategoriAdi,
            }).SingleOrDefault();
            return kayit;
        }

        [HttpGet]
        [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                kategoriId = x.kategoriId,
                kategoriAdi = x.kategoriAdi,


            }).ToList();
            return liste;
        }

        [HttpDelete]
        [Route("api/kategorisil/{kategoriId}")]
        public SonucModel KategoriSil(string kategoriId)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategoriId == kategoriId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı!";
                return sonuc;
            }
            db.Kategori.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategoriId == model.kategoriId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kategori Bulunamadı!";
                return sonuc;
            }
            kayit.kategoriAdi = model.kategoriAdi;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }




        [HttpGet]
        [Route("api/arackategoriliste/{kategoriId}")]
        public List<KayitModel> OgrenciOdevListe(string aracId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitAracId == aracId).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitAracId = x.kayitAracId,
                kayitKategoriId = x.kayitKategoriId,
            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.aracBilgi = AracById(kayit.kayitAracId);
                kayit.kategoriBilgi = KategoriById(kayit.kayitKategoriId);
            }
            return liste;
        }

        [HttpGet]
        [Route("api/kategoriaracliste/{aracId}")]
        public List<KayitModel> KategoriAracListe(string kategoriId)
        {
            List<KayitModel> liste = db.Kayit.Where(s => s.kayitKategoriId == kategoriId ).Select(x => new KayitModel()
            {
                kayitId = x.kayitId,
                kayitAracId = x.kayitAracId,
                kayitKategoriId = x.kayitKategoriId,
            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.kategoriBilgi = KategoriById(kayit.kayitKategoriId);
                kayit.aracBilgi = AracById(kayit.kayitAracId);
            }
            return liste;
        }



        [HttpPost]
        [Route("api/kayitekle")]
        public SonucModel KayitEkle(KayitModel model)
        {
            if (db.Kayit.Count(s => s.kayitAracId == model.kayitAracId && s.kayitKategoriId == model.kayitKategoriId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlgili Araç Önceden Kayıtlıdır!";
                return sonuc;
            }
            Kayit yeni = new Kayit();

            yeni.kayitId = Guid.NewGuid().ToString();
            yeni.kayitKategoriId = model.kayitKategoriId;
            yeni.kayitAracId = model.kayitAracId;
            db.Kayit.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Kaydı Eklendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kayitsil/{kayitId}")]
        public SonucModel KayitSil(string kayitId)
        {
            Kayit kayit = db.Kayit.Where(s => s.kayitId == kayitId).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            db.Kayit.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Arac Kaydı Silindi";
            return sonuc;
        }
    }
}
