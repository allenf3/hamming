using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HammingApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HammingCodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ExerciseCode = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    ErrorType = table.Column<int>(type: "int", nullable: true),
                    FlippedBit = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HammingCodes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_HammingCodes_Id",
                table: "HammingCodes",
                column: "Id",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HammingCodes");
        }
    }
}
