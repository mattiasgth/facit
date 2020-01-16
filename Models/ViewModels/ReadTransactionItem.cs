using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ReadTransactionItem
    {
        public string PersonName { get; set; }
        public decimal Credit { get; set; }
        public decimal Debit { get; set; }
        public int PersonId { get; set; }
    }
}
