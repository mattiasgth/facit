using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class CreateTransactionItem
    {
        public decimal Debit { get; set; }
        public decimal Credit { get; set; }
        public int PersonId { get; set; }
    }
}
