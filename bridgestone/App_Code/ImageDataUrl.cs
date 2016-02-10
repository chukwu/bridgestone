using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text.RegularExpressions;
using System.Web;

/// <summary>
/// Summary description for ImageDataUrl
/// </summary>
public class ImageDataUrl
{
    public ImageDataUrl(string dataUrl)
    {        
        
        var match = _regex.Match(dataUrl);
        MimeType = match.Groups["mimeType"].Value;
        Format = match.Groups["mimeSubType"].Value;
        Bytes = Convert.FromBase64String(match.Groups["data"].Value);
    }
 
    public byte[] Bytes { get; protected set; }
    public string MimeType { get; set; }
    public string Format { get; protected set; }
     
    public string SaveTo(string folder)
    {
        var fileName = Guid.NewGuid().ToString() + "." + Format;
        var fullPath = Path.Combine(folder, fileName);
 
        using(var file = File.OpenWrite(fullPath))
        {
            file.Write(Bytes, 0, Bytes.Length);
        }
        return fileName;
    }
 
    private static readonly Regex _regex = new Regex(
        @"data:(?<mimeType>[\w]+)/(?<mimeSubType>[\w]+);\w+,(?<data>.*)",
        RegexOptions.Compiled
    );
}

public class validatePhoneAE
{
    public static bool validate(string phonenumber)
    {
        Regex regex = new Regex(@"^(?:\+971|0(0971)?)(?:[234679]|5[01256])[0-9]{7}$");
        if(!regex.IsMatch(phonenumber)){
            return false;
        }
        return true;
    }
}

public class validateEmail
{
    public static bool validate(string emailString)
    {
        bool isEmail = Regex.IsMatch(emailString, @"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z", RegexOptions.IgnoreCase);

        if (!(emailString.Contains("@") && emailString.Contains(".") && isEmail))
        {
            return false;
        }

        return true;
    }
}

public class sendMail
{
    public static void startMail(string subject, string body, string relativeurl = null, string recipient = "q.khalid@turretme.com,s.beitawi@turretme.com")
    {
        MailMessage mail = new MailMessage();
        SmtpClient SmtpServer = new SmtpClient("mail.adinb.com");
        mail.From = new MailAddress("ifeanyi@adinb.com");
        mail.To.Add(recipient);
        mail.Subject = subject;
        mail.Body = body;
        mail.IsBodyHtml = true;

        if (relativeurl != null)
        {
            System.Net.Mail.Attachment attachment;
            attachment = new System.Net.Mail.Attachment(relativeurl);
            mail.Attachments.Add(attachment);
        }


        SmtpServer.Port = 2626;
        SmtpServer.Credentials = new System.Net.NetworkCredential("ifeanyi@adinb.com", "adinb@ifeanyi36");
        SmtpServer.EnableSsl = false;

        SmtpServer.Send(mail);

    }
}
