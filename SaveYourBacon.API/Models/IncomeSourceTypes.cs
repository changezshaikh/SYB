using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Models
{
    public class IncomeSourceTypes
    {
        public int IncomeSourceTypeId { get; set; }

        public string IncomeSourceName { get; set; }

        public int UserId { get; set; }

        public DateTime WhenCreated { get; set; }
    }
}