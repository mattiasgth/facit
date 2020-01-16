using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Facit.Models
{
    public class Person
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string Phone1 { get; set; }
        public string  Phone2 { get; set; }
        public List<ProjectMembership> ProjectMemberships { get; set; }
        [NotMapped]
        public string FullName { 
            get
            {
                return this.FirstName + " " + this.LastName;
            }
        }
    }
}
