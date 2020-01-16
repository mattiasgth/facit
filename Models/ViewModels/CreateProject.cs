using System;
using System.Collections.Generic;
using System.Text;

namespace Facit.Models.ViewModels
{
    public class CreateProject
    {
        public string Description { get; set; }
        public int CreatedById { get; set; }
        public int BaseCurrencyId { get; set; }
    }
}
