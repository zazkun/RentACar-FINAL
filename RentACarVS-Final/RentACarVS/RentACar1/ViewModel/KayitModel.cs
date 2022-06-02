using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RentACar1.ViewModel
{
    public class KayitModel
    {
        public string kayitId { get; set; }
        public string kayitAracId { get; set; }
        public string kayitKategoriId { get; set; }
        public KategoriModel kategoriBilgi { get; set; }
        public AracModel aracBilgi { get; set;}
    }
}