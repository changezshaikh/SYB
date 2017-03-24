using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Model
{
    public class ImportantDate
    {
        public string ExpenseAccount { get; set; }
        public string ExpenseName { get; set; }
        public DateTime ExpenseDueDate { get; set; }
        public decimal Amount { get; set; }
    }
}