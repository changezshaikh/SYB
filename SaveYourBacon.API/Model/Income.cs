//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SaveYourBacon.API.Model
{
    using System;
    using System.Collections.Generic;
    
    public partial class Income
    {
        public int IncomeId { get; set; }
        public int IncomeSourceTypeId { get; set; }
        public decimal IncomeAmount { get; set; }
        public System.DateTime IncomeDate { get; set; }
        public string Frequency { get; set; }
        public string LinkedExpenses { get; set; }
        public int UserId { get; set; }
        public int ExpenseAmountTypeId { get; set; }
        public System.DateTime WhenCreated { get; set; }
    
        public virtual AmountType AmountType { get; set; }
        public virtual IncomeSourceType IncomeSourceType { get; set; }
        public virtual User User { get; set; }
    }
}