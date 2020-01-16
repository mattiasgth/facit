﻿// <auto-generated />
using System;
using Facit.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Facit.Migrations
{
    [DbContext(typeof(FacitContext))]
    [Migration("20191222211433_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Facit.Models.Currency", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Code");

                    b.Property<decimal>("Rate");

                    b.HasKey("Id");

                    b.ToTable("Currency");
                });

            modelBuilder.Entity("Facit.Models.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("Email1");

                    b.Property<string>("Email2");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<string>("Phone1");

                    b.Property<string>("Phone2");

                    b.HasKey("Id");

                    b.ToTable("Person");
                });

            modelBuilder.Entity("Facit.Models.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("BaseCurrencyId");

                    b.Property<int?>("CreatedById");

                    b.Property<DateTime>("CreatedWhen");

                    b.Property<string>("Description");

                    b.Property<bool>("IsActive");

                    b.HasKey("Id");

                    b.HasIndex("BaseCurrencyId");

                    b.HasIndex("CreatedById");

                    b.ToTable("Project");
                });

            modelBuilder.Entity("Facit.Models.ProjectMembership", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("PersonId");

                    b.Property<int?>("ProjectId");

                    b.HasKey("Id");

                    b.HasIndex("PersonId");

                    b.HasIndex("ProjectId");

                    b.ToTable("ProjectMembership");
                });

            modelBuilder.Entity("Facit.Models.Transaction", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("CreatedById");

                    b.Property<int?>("CurrencyLocalId");

                    b.Property<string>("Description");

                    b.Property<int?>("ProjectId");

                    b.Property<DateTime>("When");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("CurrencyLocalId");

                    b.HasIndex("ProjectId");

                    b.ToTable("Transaction");
                });

            modelBuilder.Entity("Facit.Models.TransactionItem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("Amount");

                    b.Property<decimal>("AmountLocal");

                    b.Property<int?>("WhoId");

                    b.HasKey("Id");

                    b.HasIndex("WhoId");

                    b.ToTable("TransactionItem");
                });

            modelBuilder.Entity("Facit.Models.Project", b =>
                {
                    b.HasOne("Facit.Models.Currency", "BaseCurrency")
                        .WithMany()
                        .HasForeignKey("BaseCurrencyId");

                    b.HasOne("Facit.Models.Person", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");
                });

            modelBuilder.Entity("Facit.Models.ProjectMembership", b =>
                {
                    b.HasOne("Facit.Models.Person", "Person")
                        .WithMany("ProjectMemberships")
                        .HasForeignKey("PersonId");

                    b.HasOne("Facit.Models.Project", "Project")
                        .WithMany("Memberships")
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("Facit.Models.Transaction", b =>
                {
                    b.HasOne("Facit.Models.Person", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById");

                    b.HasOne("Facit.Models.Currency", "CurrencyLocal")
                        .WithMany()
                        .HasForeignKey("CurrencyLocalId");

                    b.HasOne("Facit.Models.Project", "Project")
                        .WithMany()
                        .HasForeignKey("ProjectId");
                });

            modelBuilder.Entity("Facit.Models.TransactionItem", b =>
                {
                    b.HasOne("Facit.Models.Person", "Who")
                        .WithMany()
                        .HasForeignKey("WhoId");
                });
#pragma warning restore 612, 618
        }
    }
}
