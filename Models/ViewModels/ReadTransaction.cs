using Facit.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ReadTransaction
    {
        public int ProjectId { get; set; }
        public string Description { get; set; }
        public DateTime When { get; set; }
        public int CreatedById { get; set; }
        public int CurrencyLocalId { get; set; }
        public IEnumerable<ReadTransactionItem> Participants { get; set; }
    }
}
