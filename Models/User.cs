using Facit.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Facit.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public Person Person { get; set; }
        public string Username { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        [NotMapped]
        public string Token { get; set; }
    }
}
