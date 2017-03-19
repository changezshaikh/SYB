using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Models
{
    public class TransactionPeriods
    {
        public int TransactionPeriodId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int UserId { get; set; }
    }
}