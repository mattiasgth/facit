using Facit.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ReadProjectBalance
    {
        public int PersonId { get; set; }
        public int ProjectId { get; set; }
        public decimal? Balance { get; set; }
    }
}
