using SaveYourBacon.API.Models;
using SaveYourBacon.API.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SaveYourBacon.API.Controllers
{
    public class UserController : ApiController
    {
        public IList<User> GetAllUsers()
        {
            //Return list of all users  
            return GetUsersFromDatabase();
        }

        public User GetUserDetails(int id)
        {
            var users = GetUsersFromDatabase();
            //Return a single user detail  
            var user = users.FirstOrDefault(u => u.UserId == id);
            if (user == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return user;
        }

        private IList<User> GetUsersFromDatabase()
        {
            var users = new List<User>();
            var dbUtil = new DbUtilities();
            var userDataSet = dbUtil.GetDataSetFromSql("select * from Users");
            
            if(userDataSet.Tables[0].Rows.Count > 0)
            {
                foreach(DataRow record in userDataSet.Tables[0].Rows)
                {
                    var user = ParseUserData(record);

                    users.Add(user);
                }
            }
            
            return users;
        }

        private User ParseUserData(DataRow dr)
        {
            var user = new User()
            {
                UserId = !string.IsNullOrEmpty(dr["UserId"].ToString()) ? Convert.ToInt32(dr["UserId"].ToString()) : 0,
                Username = !string.IsNullOrEmpty(dr["UserId"].ToString()) ? dr["Username"].ToString() : string.Empty,
                Email = !string.IsNullOrEmpty(dr["Email"].ToString()) ? dr["Email"].ToString() : string.Empty,
                UserPassword = !string.IsNullOrEmpty(dr["UserPassword"].ToString()) ? dr["UserPassword"].ToString() : string.Empty,
                FirstName = !string.IsNullOrEmpty(dr["FirstName"].ToString()) ? dr["FirstName"].ToString() : string.Empty,
                LastName = !string.IsNullOrEmpty(dr["LastName"].ToString()) ? dr["LastName"].ToString() : string.Empty,
                DateOfBirth = !string.IsNullOrEmpty(dr["DateOfBirth"].ToString()) ? Convert.ToDateTime(dr["DateOfBirth"].ToString()) : DateTime.MinValue,
                Gender = !string.IsNullOrEmpty(dr["Gender"].ToString()) ? dr["Gender"].ToString() : string.Empty,
                BusinessName = !string.IsNullOrEmpty(dr["BusinessName"].ToString()) ? dr["BusinessName"].ToString() : string.Empty,
                GoLiveDate = !string.IsNullOrEmpty(dr["GoLiveDate"].ToString()) ? Convert.ToDateTime(dr["GoLiveDate"].ToString()) : DateTime.MinValue
            };

            return user;
        }
    }
}
