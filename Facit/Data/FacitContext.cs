using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Facit.Models;

namespace Facit.Models
{
    public class FacitContext : DbContext
    {
        public FacitContext (DbContextOptions<FacitContext> options)
            : base(options)
        {
        }

        public DbSet<Facit.Models.Transaction> Transaction { get; set; }

        public DbSet<Facit.Models.TransactionItem> TransactionItem { get; set; }

        public DbSet<Facit.Models.Person> Person { get; set; }

        public DbSet<Facit.Models.Currency> Currency { get; set; }

        public DbSet<Facit.Models.Project> Project { get; set; }
        public DbSet<Facit.Models.ProjectMembership> ProjectMembership { get; set; }
    }
}
