using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class CreateTransaction
    {
        public int ProjectId { get; set; }
        public int CreatedById { get; set; }
        public string Description { get; set; }
        public int CurrencyLocalId { get; set; }
        public DateTime When { get; set; }
        public IEnumerable<CreateTransactionItem> Participants { get; set; }
    }
}
