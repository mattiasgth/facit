using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class ProjectListDTO
    {
        public string Description { get; set; }
        public int Id { get; set; }
        public string CreatedByName { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedWhen { get; set; }
        public string CurrencyCode { get; set; }
        public class Transaction
        {
            public string Description { get; set; }
            public int Id { get; set; }
            public DateTime When { get; set; }
            public decimal Total { get; set; }

        }
        public IEnumerable<Transaction> Transactions { get; set; }

        public class Member
        {
            public int PersonId { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public decimal Balance { get; set; }
        }
        public IEnumerable<Member> Members { get; set; }
    }
}
