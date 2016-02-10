namespace bridgestone.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MYDBContent : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.services",
                c => new
                    {
                        sid = c.Int(nullable: false, identity: true),
                        servicename = c.String(),
                        enteredby = c.String(),
                        createdwhen = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.sid);
            
            CreateTable(
                "dbo.subservices",
                c => new
                    {
                        ssid = c.Int(nullable: false, identity: true),
                        servicename = c.String(),
                        enteredby = c.String(),
                        createdwhen = c.DateTime(nullable: false),
                        sid = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ssid)
                .ForeignKey("dbo.subservices", t => t.sid)
                .Index(t => t.sid);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.subservices", "sid", "dbo.subservices");
            DropIndex("dbo.subservices", new[] { "sid" });
            DropTable("dbo.subservices");
            DropTable("dbo.services");
        }
    }
}
