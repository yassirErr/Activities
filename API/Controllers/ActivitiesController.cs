﻿using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
namespace API.Controllers
{

    public class ActivitiesController : BaseApiController
    {
  
        
        [HttpGet]
        public async Task<IActionResult>GetActivities()
        {
            return HandeResult(await Mediator.Send(new List.Query()));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {

            return HandeResult(await Mediator.Send(new Details.Query { Id = id }));

        }

        [HttpPost]

        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandeResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [Authorize(policy: "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id =id;
            return HandeResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
        //[Authorize(policy: "IsActivityHost")]

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandeResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
        [HttpPost("{id}/attend")]

        public async Task<IActionResult>Attend(Guid id)
        {
            return HandeResult(await Mediator.Send(new UpdateAttendance.Command {Id= id }));
        }
    }
}
