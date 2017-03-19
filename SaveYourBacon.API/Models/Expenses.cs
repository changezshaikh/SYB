using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Models
{
    public class Expenses
    {
        public int ExpenseId { get; set; }

        public int ExpenseAccountId { get; set; }

        public string ExpenseName { get; set; }

        public int UserId { get; set; }

        public int FrequencyId { get; set; }

        public double BillAmount { get; set; }

        public DateTime BillDate { get; set; }

        public int ExpenseAmountTypeId { get; set; }

        public DateTime WhenCreated { get; set; }
    }
}