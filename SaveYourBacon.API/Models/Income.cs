using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Models
{
    public class Income
    {
        public int IncomeId { get; set; }

        public int IncomeSourceTypeId { get; set; }

        public double IncomeAmount { get; set; }

        public DateTime IncomeDate { get; set; }

        public int FrequencyId { get; set; }

        public string LinkedExpenses { get; set; }

        public int UserId { get; set; }

        public int ExpenseAmountTypeId { get; set; }

        public DateTime WhenCreated { get; set; }
    }
}