using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Model
{
    public class TransactionRecord : Transaction
    {
        public string ExpenseName { get; set; }
        public string ExpenseAccountName { get; set; }
        public string IncomeSourceName { get; set; }
        public string Frequency { get; set; }

        public TransactionRecord(Transaction parent)
        {
            TransactionId = parent.TransactionId;
            TransactionPeriodId = parent.TransactionPeriodId;
            TransactionSourceId = parent.TransactionSourceId;
            TransactionTypeId = parent.TransactionTypeId;
            AmountContributed = parent.AmountContributed;
            BillDate = parent.BillDate;
            CustomAmount = parent.CustomAmount;
            DefaultAmount = parent.DefaultAmount;
            SurplusDeficit = parent.SurplusDeficit;
            UserId = parent.UserId;
            WhenCreated = parent.WhenCreated;
        }
    }
}