using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Facit.Models
{
    public class ProjectMembership
    {
        [Key]
        public int Id { get; set; }
        public Person Person { get; set; }
        public Project Project { get; set; }
        [NotMapped]
        public decimal? Balance { get; set; }
    }
}
