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
    
    public partial class Expense
    {
        public int ExpenseId { get; set; }
        public int ExpenseAccountId { get; set; }
        public string ExpenseName { get; set; }
        public int UserId { get; set; }
        public string Frequency { get; set; }
        public Nullable<decimal> BillAmount { get; set; }
        public Nullable<System.DateTime> BillDate { get; set; }
        public int ExpenseAmountTypeId { get; set; }
        public Nullable<System.DateTime> WhenCreated { get; set; }
        public Nullable<System.DateTime> WhenModified { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> IsProcessed { get; set; }
    
        public virtual ExpenseAccount ExpenseAccount { get; set; }
    }
}
