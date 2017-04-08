﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SaveYourBaconEntities : DbContext
    {
        public SaveYourBaconEntities()
            : base("name=SaveYourBaconEntitiesProd")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AmountType> AmountTypes { get; set; }
        public virtual DbSet<ExpenseAccount> ExpenseAccounts { get; set; }
        public virtual DbSet<Expense> Expenses { get; set; }
        public virtual DbSet<Income> Incomes { get; set; }
        public virtual DbSet<IncomeSourceType> IncomeSourceTypes { get; set; }
        public virtual DbSet<TransactionPeriod> TransactionPeriods { get; set; }
        public virtual DbSet<Transaction> Transactions { get; set; }
        public virtual DbSet<TransactionType> TransactionTypes { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<FrequencyType> FrequencyTypes { get; set; }
        public virtual DbSet<Notification> Notifications { get; set; }
        public virtual DbSet<NotificationStatu> NotificationStatus { get; set; }
    }
}
