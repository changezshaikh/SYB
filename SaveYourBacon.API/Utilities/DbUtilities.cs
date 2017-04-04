using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace SaveYourBacon.API.Utilities
{
    public class DbUtilities
    {
        public DataSet GetDataSetFromSql(string SQL)
        {
            //SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["SYBDevConnectionString"].ConnectionString);
            SqlConnection conn = new SqlConnection(Helpers.GetRDSConnectionString());
            SqlDataAdapter da = new SqlDataAdapter();
            SqlCommand cmd = conn.CreateCommand();
            cmd.CommandText = SQL;
            da.SelectCommand = cmd;
            DataSet ds = new DataSet();

            conn.Open();
            da.Fill(ds);
            conn.Close();

            return ds;
        }
    }
}