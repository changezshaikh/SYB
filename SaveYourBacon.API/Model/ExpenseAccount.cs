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
    
    public partial class ExpenseAccount
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public ExpenseAccount()
        {
            this.Expenses = new HashSet<Expense>();
        }
    
        public int ExpenseAccountId { get; set; }
        public string ExpenseAccountName { get; set; }
        public int UserId { get; set; }
        public System.DateTime WhenCreated { get; set; }
        public Nullable<System.DateTime> WhenModified { get; set; }
    
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Expense> Expenses { get; set; }
    }
}
