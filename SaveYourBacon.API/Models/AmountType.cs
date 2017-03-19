using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Models
{
    public class AmountType
    {
        public int AmountTypeId { get; set; }

        public string TypeName { get; set; }

        public DateTime WhenCreated { get; }
    }
}