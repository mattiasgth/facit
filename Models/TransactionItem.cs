using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Facit.Models
{
    public class TransactionItem
    {
        [Key]
        public int Id { get; set; }
        public Transaction Transaction { get; set; }
        public string Description { get; set; }
        public Person Who { get; set; }
        // public decimal Debit { get; set; } // the "active" side of the transaction, amount consumed in the base currency
        // public decimal Credit { get; set; } // the "passive" side of the transaction, where money came from
        public decimal Amount { get; set; } // in the base currency, using the rate current when transaction created
        public decimal AmountLocal { get; set; } // in the same currency as the transaction

    }
}
