using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Facit.Models
{
    public class Project
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public DateTime CreatedWhen { get; set; }
        public DateTime EndedWhen { get; set; }
        public Person CreatedBy { get; set; }
        public bool IsActive { get; set; }
        public Currency BaseCurrency { get; set; }
        public List<ProjectMembership> Memberships { get; set; }

        public decimal ConvertToBaseCurrency(decimal amount, Currency localCurrency)
        {
            return amount * localCurrency.Rate / this.BaseCurrency.Rate;
        }
    }
}
