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
    
    public partial class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string UserPassword { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Nullable<System.DateTime> DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string BusinessName { get; set; }
        public Nullable<System.DateTime> GoLiveDate { get; set; }
        public Nullable<System.DateTime> WhenCreated { get; set; }
        public Nullable<System.DateTime> WhenModified { get; set; }
        public string PasswordSalt { get; set; }
    }
}
