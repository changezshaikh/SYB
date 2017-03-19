using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Models
{
    public class ExpenseAccount
    {
        public int ExpenseAccountId { get; set; }

        public string ExpenseAccountName { get; set; }

        public int UserId { get; set; }

        public DateTime WhenCreated { get; }
    }
}