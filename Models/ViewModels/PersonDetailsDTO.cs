using System;
using System.Collections.Generic;
using System.Text;

namespace Models.ViewModels
{
    public class PersonDetailsDTO
    {
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }

        public IEnumerable<PersonDetailsBalancesDTO> Balances { get; set; }

        public class PersonDetailsBalancesDTO
        {
            public string ProjectDescription { get; set; }
            public int ProjectId { get; set; }
            public decimal Balance { get; set; }
            public string CurrencyCode { get; set; }
        }
    }
}
