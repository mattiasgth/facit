using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Facit.Models;

namespace Facit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectMembershipsController : ControllerBase
    {
        private readonly FacitContext _context;

        public ProjectMembershipsController(FacitContext context)
        {
            _context = context;
        }

        // GET: api/ProjectMemberships
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectMembership>>> GetProjectMembership()
        {
            return await _context.ProjectMembership.ToListAsync();
        }

        // GET: api/ProjectMemberships/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectMembership>> GetProjectMembership(int id)
        {
            var projectMembership = await _context.ProjectMembership.FindAsync(id);

            if (projectMembership == null)
            {
                return NotFound();
            }

            return projectMembership;
        }

        // PUT: api/ProjectMemberships/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProjectMembership(int id, ProjectMembership projectMembership)
        {
            if (id != projectMembership.Id)
            {
                return BadRequest();
            }

            _context.Entry(projectMembership).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectMembershipExists(id))
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

        // POST: api/ProjectMemberships
        [HttpPost]
        public async Task<ActionResult<ProjectMembership>> PostProjectMembership(ProjectMembership projectMembership)
        {
            _context.ProjectMembership.Add(projectMembership);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProjectMembership", new { id = projectMembership.Id }, projectMembership);
        }

        // DELETE: api/ProjectMemberships/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ProjectMembership>> DeleteProjectMembership(int id)
        {
            var projectMembership = await _context.ProjectMembership.FindAsync(id);
            if (projectMembership == null)
            {
                return NotFound();
            }

            _context.ProjectMembership.Remove(projectMembership);
            await _context.SaveChangesAsync();

            return projectMembership;
        }

        private bool ProjectMembershipExists(int id)
        {
            return _context.ProjectMembership.Any(e => e.Id == id);
        }
    }
}
