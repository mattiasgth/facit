using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Facit.Models;
using Models.ViewModels;

namespace Facit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionItemsController : ControllerBase
    {
        private readonly FacitContext _context;

        public TransactionItemsController(FacitContext context)
        {
            _context = context;
        }

        // GET: api/TransactionItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReadTransactionItem>>> GetTransactionItem(string transactionId)
        {
            int id = 0;
            if (!String.IsNullOrEmpty(transactionId))
            {
                id = Int32.Parse(transactionId);
            }
            return await _context.TransactionItem
                .Where(x => id == 0 || x.Transaction.Id == id)
                .Include(x => x.Who)
                .Select(x => new ReadTransactionItem()
                {
                    Credit = x.AmountLocal > 0 ? x.AmountLocal : 0,
                    Debit = x.AmountLocal < 0 ? x.AmountLocal : 0,
                    PersonId = x.Who.Id,
                    PersonName = x.Who.FullName
                })
                .ToListAsync();
        }

        // GET: api/TransactionItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionItem>> GetTransactionItem(int id)
        {
            var transactionItem = await _context.TransactionItem.FindAsync(id);

            if (transactionItem == null)
            {
                return NotFound();
            }

            return transactionItem;
        }

        // PUT: api/TransactionItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTransactionItem(int id, TransactionItem transactionItem)
        {
            if (id != transactionItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(transactionItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransactionItemExists(id))
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

        // POST: api/TransactionItems
        [HttpPost]
        public async Task<ActionResult<TransactionItem>> PostTransactionItem(TransactionItem transactionItem)
        {
            _context.TransactionItem.Add(transactionItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTransactionItem", new { id = transactionItem.Id }, transactionItem);
        }

        // DELETE: api/TransactionItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TransactionItem>> DeleteTransactionItem(int id)
        {
            var transactionItem = await _context.TransactionItem.FindAsync(id);
            if (transactionItem == null)
            {
                return NotFound();
            }

            _context.TransactionItem.Remove(transactionItem);
            await _context.SaveChangesAsync();

            return transactionItem;
        }

        private bool TransactionItemExists(int id)
        {
            return _context.TransactionItem.Any(e => e.Id == id);
        }
    }
}
