using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace TasksAngular.Migrations
{
    public partial class InitialDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CalendarEventRecurrences",
                columns: table => new
                {
                    CalendarEventRecurrenceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CalendarEventId = table.Column<int>(nullable: false),
                    DayOfMonth = table.Column<int>(nullable: true),
                    DayOfWeek = table.Column<int>(nullable: true),
                    IntervalType = table.Column<int>(nullable: false),
                    MonthNo = table.Column<int>(nullable: true),
                    RepeatEveryCount = table.Column<int>(nullable: false),
                    StartOnDate = table.Column<DateTime>(type: "date", nullable: false),
                    WeekOfYear = table.Column<int>(nullable: true),
                    WeekdayOfMonth = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalendarEventRecurrences", x => x.CalendarEventRecurrenceId);
                });

            migrationBuilder.CreateTable(
                name: "CalendarEvents",
                columns: table => new
                {
                    CalendarEventId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    Description = table.Column<string>(maxLength: 50, nullable: true),
                    HasTime = table.Column<bool>(nullable: false),
                    PriorityId = table.Column<int>(nullable: true),
                    ProjectId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CalendarEvents", x => x.CalendarEventId);
                });

            migrationBuilder.CreateTable(
                name: "HabitEndOnType",
                columns: table => new
                {
                    HabitEndOnTypeId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HabitEndOnType", x => x.HabitEndOnTypeId);
                });

            migrationBuilder.CreateTable(
                name: "HabitExceptions",
                columns: table => new
                {
                    HabitExceptionId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    HabitId = table.Column<int>(nullable: false),
                    HabitReccurrenceId = table.Column<int>(nullable: false),
                    IsHidden = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HabitExceptions", x => x.HabitExceptionId);
                });

            migrationBuilder.CreateTable(
                name: "HabitRecurrences",
                columns: table => new
                {
                    HabitRecurrenceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DayOfMonth = table.Column<int>(nullable: true),
                    DayOfWeek = table.Column<int>(nullable: true),
                    HabitId = table.Column<int>(nullable: false),
                    IntervalType = table.Column<int>(nullable: false),
                    MonthNo = table.Column<int>(nullable: true),
                    RepeatEveryCount = table.Column<int>(nullable: false, defaultValueSql: "((1))"),
                    StartOnDate = table.Column<DateTime>(type: "date", nullable: false),
                    WeekOfYear = table.Column<int>(nullable: true),
                    WeekdayOfMonth = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HabitRecurrences", x => x.HabitRecurrenceId);
                });

            migrationBuilder.CreateTable(
                name: "Priority",
                columns: table => new
                {
                    PriorityId = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priority", x => x.PriorityId);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    ProjectId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    Description = table.Column<string>(maxLength: 50, nullable: true),
                    IsComplete = table.Column<bool>(nullable: false),
                    PriorityId = table.Column<int>(nullable: true),
                    TimeFrameId = table.Column<int>(nullable: true),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.ProjectId);
                });

            migrationBuilder.CreateTable(
                name: "Thoughts",
                columns: table => new
                {
                    ThoughtId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    Description = table.Column<string>(maxLength: 100, nullable: false),
                    ProjectId = table.Column<string>(type: "nchar(10)", nullable: true),
                    SortId = table.Column<int>(nullable: false),
                    TimeFrameDateTime = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(datefromparts((2050),(1),(1)))"),
                    TimeFrameId = table.Column<int>(nullable: false, defaultValueSql: "((0))"),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Thoughts", x => x.ThoughtId);
                });

            migrationBuilder.CreateTable(
                name: "TimeFrameType",
                columns: table => new
                {
                    TimeFrameId = table.Column<int>(nullable: false),
                    Name = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeFrameType", x => x.TimeFrameId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Habits",
                columns: table => new
                {
                    HabitId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Count = table.Column<int>(nullable: true, defaultValueSql: "((0))"),
                    DateTime = table.Column<DateTime>(type: "datetime", nullable: false),
                    Description = table.Column<string>(maxLength: 50, nullable: false),
                    EndOnCount = table.Column<int>(nullable: true, defaultValueSql: "((0))"),
                    EndOnDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    EndOnType = table.Column<int>(nullable: false, defaultValueSql: "((0))"),
                    IsComplete = table.Column<bool>(nullable: false),
                    PriorityId = table.Column<int>(nullable: true),
                    ProjectId = table.Column<int>(nullable: false),
                    TimeFrameId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Habits", x => x.HabitId);
                    table.ForeignKey(
                        name: "FK_Habits_HabitEndOnType",
                        column: x => x.EndOnType,
                        principalTable: "HabitEndOnType",
                        principalColumn: "HabitEndOnTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    TaskId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(maxLength: 100, nullable: false),
                    IsComplete = table.Column<bool>(nullable: false),
                    PriorityId = table.Column<int>(nullable: true),
                    ProjectId = table.Column<int>(nullable: true),
                    TimeFrameDateTime = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(datefromparts((2050),(1),(1)))"),
                    TimeFrameId = table.Column<int>(nullable: false, defaultValueSql: "((0))"),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.TaskId);
                    table.ForeignKey(
                        name: "FK_Tasks_ToPriority",
                        column: x => x.PriorityId,
                        principalTable: "Priority",
                        principalColumn: "PriorityId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tasks_ToUser",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "User",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Habits_EndOnType",
                table: "Habits",
                column: "EndOnType");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_PriorityId",
                table: "Tasks",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_UserId",
                table: "Tasks",
                column: "User");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CalendarEventRecurrences");

            migrationBuilder.DropTable(
                name: "CalendarEvents");

            migrationBuilder.DropTable(
                name: "HabitExceptions");

            migrationBuilder.DropTable(
                name: "HabitRecurrences");

            migrationBuilder.DropTable(
                name: "Habits");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Thoughts");

            migrationBuilder.DropTable(
                name: "TimeFrameType");

            migrationBuilder.DropTable(
                name: "HabitEndOnType");

            migrationBuilder.DropTable(
                name: "Priority");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
