using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HammingApi.Migrations
{
    public partial class ChangeUserColumnToUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn("User", "Attempts", "UserId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Attempts",
                type: "nvarchar(450)",
                oldType: "nvarchar(max)",
                nullable: true
            );

            migrationBuilder.CreateIndex(
                name: "IX_Attempts_UserId",
                table: "Attempts",
                column: "UserId"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex("IX_Attempts_UserId", "Attempts");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Attempts",
                type: "nvarchar(max)",
                oldType: "nvarchar(450)",
                nullable: true
            );

            migrationBuilder.RenameColumn("UserId", "Attempts", "User");
        }
    }
}
