using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Facit.Models;
using Facit.Models.ViewModels;
using Models.ViewModels;

namespace Facit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly FacitContext _context;

        public ProjectsController(FacitContext context)
        {
            _context = context;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects(string filter = null, 
            string sortField = "id", string sortDirection = "asc", int pageNumber = 0, int pageSize = 30)
        {
            return await _context.Project
                .Include(x => x.CreatedBy)
                .Include(x => x.BaseCurrency)
                .OrderBy(x => x.CreatedWhen)
                .ToListAsync();
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _context.Project
                .Include(createdBy => createdBy.CreatedBy)
                .Include(baseCurrency => baseCurrency.BaseCurrency)
                .Include(members => members.Memberships)
                .Where(x => x.Id == id)
                .SingleOrDefaultAsync();

            if (project == null)
            {
                return NotFound();
            }

            var transactions = await _context.Transaction
                .Include(x => x.Project)
                .Where(x => x.Project.Id == id)
                .Include(x => x.TransactionItems)
                .ThenInclude(y => y.Who)
                .ToListAsync();

            foreach(var t in transactions.Where(x => x.Project.Id == id))
            {
                foreach (var ti in t.TransactionItems)
                {
                    var membership = project.Memberships.Find(x => x.Person.Id == ti.Who.Id);
                    if (membership == null)
                    {
                        membership = new ProjectMembership()
                        {
                            Person = ti.Who,
                            Balance = 0,
                            Project = project
                        };
                        // throw new DataMisalignedException("Need membership for each transaction item");
                    }
                    if(membership.Balance == null)
                    {
                        membership.Balance = 0;
                    }
                    membership.Balance += ti.AmountLocal;
                }
            }

            return project;
        }

        // GET: api/projects/5/members
        [HttpGet("{id}/members")]
        public async Task<ActionResult<IEnumerable<Person>>> GetProjectMembers(int id)
        {
            var members = await _context
                .TransactionItem
                .Include(ti => ti.Who)
                .Include(ti => ti.Transaction)
                .ThenInclude(t => t.Project)
                .Where(ti => ti.Transaction.Project.Id == id)
                .Select(ti => ti.Who)
                .Distinct()
                .ToListAsync();
            return members;
        }

        [HttpGet("{id}/balances")]
        public async Task<ActionResult<IEnumerable<ReadProjectBalance>>> GetBalancesByProjectId(int id)
        {
            var balances = await _context
                .TransactionItem
                .Include(x => x.Who)
                .Include(x => x.Transaction)
                .ThenInclude(y => y.Project)
                .Where(x => x.Transaction.Project.Id == id)
                .GroupBy(x => new Tuple<int, int>(x.Who.Id, x.Transaction.Project.Id))
                .Select(x => new ReadProjectBalance()
                {
                    PersonId = x.First().Who.Id,
                    ProjectId = x.Key.Item2,
                    Balance = x.Sum(ti => ti.Amount)                    
                })
                .ToListAsync();
            return balances;
        }

        // GET: api/projects/5/transactions
        [HttpGet("{id}/transactions")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetProjectTransactions(int id)
        {
            var rslt = await _context
                .Transaction
                .Where(pm => pm.Project.Id == id)
                .ToListAsync();

            return rslt;
        }

        // PUT: api/Projects/5/Members/2
        [HttpPut("{id}/members/{personId}")]
        public async Task<IActionResult> PutProjectMembers(int id, int personId)
        {
            if(!ProjectExists(id))
            {
                return NotFound();
            }
            var project = _context.Project
                .Where(x => x.Id == id)
                .Include(x => x.Memberships)
                .Single();
            var person = _context.Person
                .Where(x => x.Id == personId)
                .SingleOrDefault();
            if(person == null)
            {
                return NotFound("No such person");
            }
            var membership = new ProjectMembership()
            {
                Person = person,
                Project = project
            };
            _context.ProjectMembership.Add(membership);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _context.Entry(project).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<ActionResult<Project>> PostProject(CreateProject vm)
        {
            var project = new Project();
            project.CreatedBy = _context.Person.Find(vm.CreatedById);
            if(project.CreatedBy == null)
            {
                return BadRequest("CreatedById: no such user");
            }
            project.CreatedWhen = DateTime.UtcNow;
            project.BaseCurrency = _context.Currency.Find(vm.BaseCurrencyId);
            if(project.BaseCurrency == null) 
            {
                return BadRequest("BaseCurrencyId: no such currency");
            }
            project.Description = vm.Description;
            project.IsActive = true;
            _context.Project.Add(project);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProject", new { id = project.Id }, project);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Project>> DeleteProject(int id)
        {
            var project = await _context.Project.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            _context.Project.Remove(project);
            await _context.SaveChangesAsync();

            return project;
        }

        private bool ProjectExists(int id)
        {
            return _context.Project.Any(e => e.Id == id);
        }
    }
}
