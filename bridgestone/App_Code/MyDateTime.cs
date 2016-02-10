using System;
using System.Collections.Generic;
using System.Web;
using System.Linq;

/// <summary>
/// Summary description for MyDateTime
/// </summary>
public class MyDateTime
{
    public MyDateTime()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public static DateTime Now(string timezone = "Arabian Standard Time")
    {
        timezone = timezone == null ? HttpContext.Current.Session["mytimezone"].ToString() : timezone;
        DateTime server_now = DateTime.Now;
        DateTime user_now = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(server_now, timezone);
        return user_now;
        
    }
    public static DateTime Today(String timezone = "Arabian Standard Time")
    {
        timezone = timezone == null ? HttpContext.Current.Session["mytimezone"].ToString() : timezone;
        DateTime server_today = DateTime.Today;
        DateTime user_today = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(server_today, timezone);
        return user_today;
       
    }
    public static DateTime Parse(String time){
        DateTime user_time = DateTime.Parse(Now().ToShortDateString() + " " + time);
        return user_time;
       
    }
    public static DateTime convertdate(String fromtimezone, String totimezone, DateTime datetimetochange)
    {
        TimeZoneInfo fzone = TimeZoneInfo.FindSystemTimeZoneById(fromtimezone);
        TimeZoneInfo tZone = TimeZoneInfo.FindSystemTimeZoneById(totimezone);
        return TimeZoneInfo.ConvertTime(datetimetochange, fzone, tZone);

    }
    public static DateTime Parse2(String time, String timezone)
    {
        DateTime user_time = DateTime.Parse(Now(timezone).ToShortDateString() + " " + time);
        return user_time;

    }
    public static DateTime GetDate(DateTime date, string timezone = null)
    {
        timezone = timezone == null ? HttpContext.Current.Session["mytimezone"].ToString() : timezone;
        DateTime server_now = date;
        DateTime user_now = TimeZoneInfo.ConvertTimeBySystemTimeZoneId(server_now, timezone);
        return user_now;

    }
}
