using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Facit.Models;
using Models.ViewModels;
using System.Diagnostics;

namespace Facit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly FacitContext _context;

        public TransactionsController(FacitContext context)
        {
            _context = context;
        }

        // GET: api/Transactions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransaction()
        {
            return await _context.Transaction.ToListAsync();
        }

        // GET: api/Transactions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadTransaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transaction
                .Where(x => x.Id == id)
                .Include(x => x.CurrencyLocal)
                .Include(x => x.CreatedBy)
                .Include(x => x.Project)
                .Include(x => x.TransactionItems)
                .ThenInclude(x => x.Who)
                .SingleOrDefaultAsync();

            if (transaction == null)
            {
                return NotFound();
            }

            var rslt = new ReadTransaction()
            {
                CreatedById = transaction.CreatedBy.Id,
                CurrencyLocalId = transaction.CurrencyLocal.Id,
                Description = transaction.Description,
                ProjectId = transaction.Project.Id,
                When = transaction.When
            };

            var lst = new List<ReadTransactionItem>();

            foreach(var ti in transaction.TransactionItems)
            {
                var participant = lst.Find(x => x.PersonId == ti.Who.Id);
                if(participant == null)
                {
                    participant = new ReadTransactionItem();
                    participant.PersonId = ti.Who.Id;
                    participant.PersonName = ti.Who.FullName;
                    lst.Add(participant);
                }
                if (ti.AmountLocal < 0)
                {
                    participant.Debit += ti.AmountLocal;
                }
                if (ti.AmountLocal > 0)
                {
                    participant.Credit += ti.AmountLocal;
                }
            }

            rslt.Participants = lst;

            return rslt;
        }

        // PUT: api/Transactions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransaction(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }

            _context.Entry(transaction).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionExists(id))
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

        // POST: api/Transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> PostTransaction(CreateTransaction model)
        {
            try
            {
                Project project = _context.Project.Where(x => x.Id == model.ProjectId)
                    .Include(x => x.BaseCurrency)
                    .SingleOrDefault();
                if (project == null)
                {
                    return BadRequest($"No Project using id={{model.ProjectId}}");
                }
                Currency localCurrency = _context.Currency.Find(model.CurrencyLocalId);
                if (localCurrency == null)
                {
                    return BadRequest($"No Currency using id={{model.CurrencyLocalId}}");
                }
                Transaction transaction = new Transaction()
                {
                    CreatedBy = _context.Person.Find(model.CreatedById),
                    Description = model.Description,
                    Project = project,
                    When = model.When,
                    CurrencyLocal = localCurrency
                };
                _context.Transaction.Add(transaction);
                foreach (var p in model.Participants)
                {
                    if (p.Credit > 0)
                    {
                        var ti = new TransactionItem()
                        {
                            Who = _context.Person.Find(p.PersonId)
                        };
                        ti.Amount = 0;
                        ti.AmountLocal = 0;
                        ti.AmountLocal += p.Credit;
                        ti.Amount += project.ConvertToBaseCurrency(p.Credit, localCurrency);
                        ti.Transaction = transaction;
                        _context.Add(ti);
                    }
                    if (p.Debit > 0)
                    {
                        var ti = new TransactionItem()
                        {
                            Who = _context.Person.Find(p.PersonId)
                        };
                        ti.Amount = 0;
                        ti.AmountLocal = 0;
                        ti.AmountLocal -= p.Debit;
                        ti.Amount -= project.ConvertToBaseCurrency(p.Debit, localCurrency);
                        ti.Transaction = transaction;
                        _context.Add(ti);
                    }
                }
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTransaction", new { id = transaction.Id }, transaction);
            }
            catch(Exception ex)
            {
                Debug.WriteLine(ex);
                throw;
            }
        }

        // DELETE: api/Transactions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Transaction>> DeleteTransaction(int id)
        {
            var transaction = await _context.Transaction.FindAsync(id);
            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transaction.Remove(transaction);
            await _context.SaveChangesAsync();

            return transaction;
        }

        private bool TransactionExists(int id)
        {
            return _context.Transaction.Any(e => e.Id == id);
        }
    }
}
