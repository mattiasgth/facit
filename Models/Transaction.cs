using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Facit.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public Project Project { get; set; }
        public string Description { get; set; }
        public DateTime When { get; set; }
        public Person CreatedBy { get; set; }
        public Currency CurrencyLocal { get; set; }
        public IEnumerable<TransactionItem> TransactionItems { get; set; }
    }
}
