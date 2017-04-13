using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Model
{
    public class Constants
    {
        public enum TransactionType
        {
            Income = 1000,
            Expense = 1001
        }

        public enum AmountTypes
        {
            Fixed = 1000,
            Variable = 1001,
            OneTime = 1002
        }

        public enum FrequencyYearlyNumber
        {
            Weekly = 52,
            Fortnightly = 26,
            Monthly = 12,
            Quarterly = 4,
            BiAnnually = 2,
            Annually = 1
        }

        public enum ProcessedStatus
        {
            Pending = 0,
            Done = 1
        }

        public static class Frequency
        {
            const string Annually = "Annually";
            //Fortnightly,
            //Monthly,
            //Quarterly,
            //BiAnnually,
            //Annually
        }
    }
}