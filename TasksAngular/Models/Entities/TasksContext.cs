using System;
using Microsoft.EntityFrameworkCore;

namespace TasksAngular.Models.Entities
{
    public partial class TasksContext : DbContext
    {
        public TasksContext(DbContextOptions<TasksContext> options): base((DbContextOptions) options)
        {
        }

        public virtual DbSet<CalendarEventRecurrence> CalendarEventRecurrences { get; set; }
        public virtual DbSet<CalendarEvent> CalendarEvents { get; set; }
        public virtual DbSet<HabitEndOnType> HabitEndOnType { get; set; }
        public virtual DbSet<HabitException> HabitExceptions { get; set; }
        public virtual DbSet<HabitRecurrence> HabitRecurrences { get; set; }
        public virtual DbSet<Habit> Habits { get; set; }
        public virtual DbSet<Priority> Priority { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<Task> Tasks { get; set; }
        public virtual DbSet<Thought> Thoughts { get; set; }
        public virtual DbSet<TimeFrameType> TimeFrameType { get; set; }
        public virtual DbSet<User> Users { get; set; }

        // Unable to generate entity type for table 'dbo.ProjectOrg'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=D:\USERS\DALE.MORGAN\DOCUMENTS\VISUAL STUDIO 2017\PROJECTS\TASKSANGULAR\TASKSANGULAR\APPDATA\TASKS.MDF");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CalendarEventRecurrence>(entity =>
            {
                entity.HasKey(e => e.CalendarEventRecurrenceId);

                entity.Property(e => e.StartOnDate).HasColumnType<DateTime>("date");
            });

            modelBuilder.Entity<CalendarEvent>(entity =>
            {
                entity.HasKey(e => e.CalendarEventId);

                entity.Property(e => e.DateTime).HasColumnType<DateTime>("datetime");

                entity.Property(e => e.Description).HasMaxLength(50);
            });

            modelBuilder.Entity<HabitEndOnType>(entity =>
            {
                entity.Property(e => e.HabitEndOnTypeId).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<HabitException>(entity =>
            {
                entity.HasKey(e => e.HabitExceptionId);

                entity.Property(e => e.DateTime).HasColumnType<DateTime>("datetime");
            });

            modelBuilder.Entity<HabitRecurrence>(entity =>
            {
                entity.HasKey(e => e.HabitRecurrenceId);

                entity.Property(e => e.RepeatEveryCount).HasDefaultValueSql<int>("((1))");

                entity.Property(e => e.StartOnDate).HasColumnType<DateTime>("date");
            });

            modelBuilder.Entity<Habit>(entity =>
            {
                entity.HasKey(e => e.HabitId);

                entity.Property(e => e.Count).HasDefaultValueSql<int?>("((0))");

                entity.Property(e => e.DateTime).HasColumnType<DateTime>("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.EndOnCount).HasDefaultValueSql<int?>("((0))");

                entity.Property(e => e.EndOnDate).HasColumnType<DateTime>("datetime");

                entity.Property(e => e.EndOnType).HasDefaultValueSql<int>("((0))");

                entity.HasOne(d => d.EndOnTypeNavigation)
                    .WithMany(p => p.Habits)
                    .HasForeignKey(d => d.EndOnType)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Habits_HabitEndOnType");
            });

            modelBuilder.Entity<Priority>(entity =>
            {
                entity.Property(e => e.PriorityId).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Project>(entity =>
            {
                entity.HasKey(e => e.ProjectId);

                entity.Property(e => e.DateTime).HasColumnType<DateTime>("datetime");

                entity.Property(e => e.Description).HasMaxLength(50);
            });

            modelBuilder.Entity<Task>(entity =>
            {
                entity.HasKey(e => e.TaskId);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.TimeFrameDateTime)
                    .HasColumnType<DateTime>("datetime")
                    .HasDefaultValueSql("(datefromparts((2050),(1),(1)))");

                entity.Property(e => e.TimeFrameId).HasDefaultValueSql<int>("((0))");

                entity.HasOne(d => d.Priority)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.PriorityId)
                    .HasConstraintName("FK_Tasks_ToPriority");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Tasks)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tasks_ToUser");
            });
            
            modelBuilder.Entity<Thought>(entity =>
            {
                entity.HasKey(e => e.ThoughtId);

                entity.Property(e => e.CreatedDateTime).HasColumnType<DateTime>("datetime");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ProjectId).HasColumnType<string>("nchar(10)");

                entity.Property(e => e.TimeFrameDateTime)
                    .HasColumnType<DateTime>("datetime")
                    .HasDefaultValueSql("(datefromparts((2050),(1),(1)))");

                entity.Property(e => e.TimeFrameId).HasDefaultValueSql<int>("((0))");
            });
            

            modelBuilder.Entity<TimeFrameType>(entity =>
            {
                entity.HasKey(e => e.TimeFrameId);

                entity.Property(e => e.TimeFrameId).ValueGeneratedNever();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}
