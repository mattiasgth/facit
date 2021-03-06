﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Facit.Models;
using Models.ViewModels;
using AutoMapper;

namespace Facit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly FacitContext _context;
        private readonly IMapper _mapper;

        public PeopleController(FacitContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        // GET: api/People
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> GetPeople([FromQuery]string filter)
        {
            if(!String.IsNullOrEmpty(filter))
            {
                filter = filter.ToLower();
                return await _context.Person
                    .Where(x => x.Email1.ToLower().Contains(filter) || x.FullName.ToLower().Contains(filter))
                    .OrderBy(x => x.FullName)
                    .Take(10)
                    .ToListAsync();
            }
            return await _context.Person.ToListAsync();
        }

        // GET: api/People/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PersonDetailsDTO>> GetPerson(int id)
        {
            var person = await _context.Person.FindAsync(id);

            if (person == null)
            {
                return NotFound();
            }

            var rslt = _mapper.Map<PersonDetailsDTO>(person);

            rslt.Balances = await _context
                .TransactionItem
                .Include(x => x.Who)
                .Include(x => x.Transaction)
                .ThenInclude(y => y.Project)
                .ThenInclude(z => z.BaseCurrency)
                .Where(x => x.Who.Id == id)
                .GroupBy(x => x.Transaction.Project)
                .Select(x => new PersonDetailsDTO.PersonDetailsBalancesDTO()
                {
                    ProjectDescription = x.First().Transaction.Project.Description,
                    ProjectId = x.First().Transaction.Project.Id,
                    Balance = x.Sum(ti => ti.Amount),
                    CurrencyCode = x.First().Transaction.Project.BaseCurrency.Code
                })
                .ToListAsync();

            return rslt;
        }

        // PUT: api/People/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPerson(int id, Person person)
        {
            if (id != person.Id)
            {
                return BadRequest();
            }

            _context.Entry(person).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonExists(id))
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

        // POST: api/People
        [HttpPost]
        public async Task<ActionResult<Person>> PostPerson(Person person)
        {
            _context.Person.Add(person);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPerson", new { id = person.Id }, person);
        }

        // DELETE: api/People/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Person>> DeletePerson(int id)
        {
            var person = await _context.Person.FindAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            _context.Person.Remove(person);
            await _context.SaveChangesAsync();

            return person;
        }

        private bool PersonExists(int id)
        {
            return _context.Person.Any(e => e.Id == id);
        }
    }
}
