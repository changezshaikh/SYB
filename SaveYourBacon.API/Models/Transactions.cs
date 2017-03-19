using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Models
{
    public class Transactions
    {
        public int TransactionId { get; set; }

        public int TransactionTypeId { get; set; }

        public double DefaultAmount { get; set; }

        public double CustomAmount { get; set; }

        public DateTime BillDate { get; set; }

        public int TransactionSourceId { get; set; }

        public int TransactionPeriodId { get; set; }

        public double AmountContributed { get; set; }

        public double SurplusDeficit { get; set; }

        public DateTime WhenCreated { get; set; }
    }
}