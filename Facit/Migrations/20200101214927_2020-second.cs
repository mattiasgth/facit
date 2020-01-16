using Microsoft.EntityFrameworkCore.Migrations;

namespace Facit.Migrations
{
    public partial class _2020second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "TransactionItem",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TransactionId",
                table: "TransactionItem",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TransactionItem_TransactionId",
                table: "TransactionItem",
                column: "TransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_TransactionItem_Transaction_TransactionId",
                table: "TransactionItem",
                column: "TransactionId",
                principalTable: "Transaction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TransactionItem_Transaction_TransactionId",
                table: "TransactionItem");

            migrationBuilder.DropIndex(
                name: "IX_TransactionItem_TransactionId",
                table: "TransactionItem");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "TransactionItem");

            migrationBuilder.DropColumn(
                name: "TransactionId",
                table: "TransactionItem");
        }
    }
}
