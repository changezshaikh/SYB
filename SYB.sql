USE [master]
GO
/****** Object:  Database [SaveYourBacon]    Script Date: 18/03/2017 12:09:25 PM ******/
CREATE DATABASE [SaveYourBacon]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SaveYourBacon', FILENAME = N'C:\Users\Changez Shaikh\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\SaveYourBacon.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SaveYourBacon_log', FILENAME = N'C:\Users\Changez Shaikh\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\SaveYourBacon.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SaveYourBacon] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SaveYourBacon].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SaveYourBacon] SET ANSI_NULL_DEFAULT ON 
GO
ALTER DATABASE [SaveYourBacon] SET ANSI_NULLS ON 
GO
ALTER DATABASE [SaveYourBacon] SET ANSI_PADDING ON 
GO
ALTER DATABASE [SaveYourBacon] SET ANSI_WARNINGS ON 
GO
ALTER DATABASE [SaveYourBacon] SET ARITHABORT ON 
GO
ALTER DATABASE [SaveYourBacon] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [SaveYourBacon] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SaveYourBacon] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SaveYourBacon] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SaveYourBacon] SET CURSOR_DEFAULT  LOCAL 
GO
ALTER DATABASE [SaveYourBacon] SET CONCAT_NULL_YIELDS_NULL ON 
GO
ALTER DATABASE [SaveYourBacon] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SaveYourBacon] SET QUOTED_IDENTIFIER ON 
GO
ALTER DATABASE [SaveYourBacon] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SaveYourBacon] SET  DISABLE_BROKER 
GO
ALTER DATABASE [SaveYourBacon] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SaveYourBacon] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SaveYourBacon] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SaveYourBacon] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SaveYourBacon] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SaveYourBacon] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SaveYourBacon] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SaveYourBacon] SET RECOVERY FULL 
GO
ALTER DATABASE [SaveYourBacon] SET  MULTI_USER 
GO
ALTER DATABASE [SaveYourBacon] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SaveYourBacon] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SaveYourBacon] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SaveYourBacon] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SaveYourBacon] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SaveYourBacon] SET QUERY_STORE = OFF
GO
USE [SaveYourBacon]
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [SaveYourBacon]
GO
/****** Object:  Table [dbo].[ExpenseAccounts]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExpenseAccounts](
	[ExpenseAccountId] [int] NOT NULL,
	[ExpenseAccountName] [varchar](50) NOT NULL,
	[UserId] [int] NOT NULL,
	[WhenCreated] [date] NOT NULL,
	[WhenModified] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[ExpenseAccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ExpenseAmountTypes]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExpenseAmountTypes](
	[ExpenseAmountTypeId] [int] NOT NULL,
	[TypeName] [varchar](50) NOT NULL,
	[WhenCreated] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ExpenseAmountTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Expenses]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Expenses](
	[ExpenseId] [int] NOT NULL,
	[ExpenseAccountId] [int] NOT NULL,
	[ExpenseName] [varchar](50) NOT NULL,
	[UserId] [int] NOT NULL,
	[Frequency] [varchar](50) NOT NULL,
	[BillAmount] [money] NULL,
	[BillDate] [date] NULL,
	[ExpenseAmountTypeId] [int] NOT NULL,
	[WhenCreated] [datetime] NULL,
	[WhenModified] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[ExpenseId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Income]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Income](
	[IncomeId] [int] NOT NULL,
	[IncomeSourceTypeId] [int] NOT NULL,
	[IncomeAmount] [money] NOT NULL,
	[IncomeDate] [date] NOT NULL,
	[Frequency] [varchar](50) NULL,
	[LinkedExpenses] [varchar](max) NULL,
	[UserId] [int] NOT NULL,
	[ExpenseAmountTypeId] [int] NOT NULL,
	[WhenCreated] [date] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IncomeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[IncomeSourceTypes]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IncomeSourceTypes](
	[IncomeSourceTypeId] [int] NOT NULL,
	[IncomeSourceName] [varchar](50) NOT NULL,
	[UserId] [int] NOT NULL,
	[WhenCreated] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IncomeSourceTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Table]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table](
	[IncomeId] [int] NOT NULL,
	[IncomeSourceTypeId] [int] NOT NULL,
	[IncomeAmount] [money] NOT NULL,
	[IncomeDate] [date] NOT NULL,
	[Frequency] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[IncomeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TransactionPeriods]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionPeriods](
	[TransactionPeriodId] [int] NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[UserId] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TransactionPeriodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Transactions]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transactions](
	[TransactionId] [int] NOT NULL,
	[TransactionTypeId] [int] NOT NULL,
	[DefaultAmount] [money] NOT NULL,
	[CustomAmount] [money] NULL,
	[BillDate] [date] NULL,
	[TransactionSourceId] [int] NULL,
	[TransactionPeriodId] [int] NULL,
	[AmountContributed] [money] NULL,
	[SurplusDeficit] [money] NULL,
	[WhenCreated] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TransactionTypes]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionTypes](
	[TransactionTypeId] [int] NOT NULL,
	[TransactionName] [varchar](50) NOT NULL,
 CONSTRAINT [TransactionTypes_PK] PRIMARY KEY CLUSTERED 
(
	[TransactionTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Users]    Script Date: 18/03/2017 12:09:25 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] NOT NULL,
	[Username] [varchar](20) NOT NULL,
	[Email] [varchar](35) NOT NULL,
	[UserPassword] [varchar](20) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[DateOfBirth] [date] NULL,
	[Gender] [varchar](5) NOT NULL,
	[BusinessName] [varchar](50) NULL,
	[GoLiveDate] [date] NULL,
	[WhenCreated] [date] NULL,
	[WhenModified] [date] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[ExpenseAccounts] ADD  DEFAULT (getdate()) FOR [WhenCreated]
GO
ALTER TABLE [dbo].[ExpenseAmountTypes] ADD  DEFAULT (getdate()) FOR [WhenCreated]
GO
ALTER TABLE [dbo].[Expenses] ADD  DEFAULT (getdate()) FOR [WhenCreated]
GO
ALTER TABLE [dbo].[Income] ADD  DEFAULT (getdate()) FOR [WhenCreated]
GO
ALTER TABLE [dbo].[IncomeSourceTypes] ADD  DEFAULT (getdate()) FOR [WhenCreated]
GO
ALTER TABLE [dbo].[Transactions] ADD  DEFAULT (getdate()) FOR [WhenCreated]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [WhenCreated]
GO
ALTER TABLE [dbo].[ExpenseAccounts]  WITH CHECK ADD  CONSTRAINT [ExpenseAccounts_FK1] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[ExpenseAccounts] CHECK CONSTRAINT [ExpenseAccounts_FK1]
GO
ALTER TABLE [dbo].[Expenses]  WITH CHECK ADD  CONSTRAINT [Expenses_FK1] FOREIGN KEY([ExpenseAccountId])
REFERENCES [dbo].[ExpenseAccounts] ([ExpenseAccountId])
GO
ALTER TABLE [dbo].[Expenses] CHECK CONSTRAINT [Expenses_FK1]
GO
ALTER TABLE [dbo].[Expenses]  WITH CHECK ADD  CONSTRAINT [Expenses_FK2] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Expenses] CHECK CONSTRAINT [Expenses_FK2]
GO
ALTER TABLE [dbo].[Expenses]  WITH CHECK ADD  CONSTRAINT [Expenses_FK3] FOREIGN KEY([ExpenseAmountTypeId])
REFERENCES [dbo].[ExpenseAmountTypes] ([ExpenseAmountTypeId])
GO
ALTER TABLE [dbo].[Expenses] CHECK CONSTRAINT [Expenses_FK3]
GO
ALTER TABLE [dbo].[Income]  WITH CHECK ADD  CONSTRAINT [Income_FK1] FOREIGN KEY([IncomeSourceTypeId])
REFERENCES [dbo].[IncomeSourceTypes] ([IncomeSourceTypeId])
GO
ALTER TABLE [dbo].[Income] CHECK CONSTRAINT [Income_FK1]
GO
ALTER TABLE [dbo].[Income]  WITH CHECK ADD  CONSTRAINT [Income_FK2] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Income] CHECK CONSTRAINT [Income_FK2]
GO
ALTER TABLE [dbo].[Income]  WITH CHECK ADD  CONSTRAINT [Income_FK3] FOREIGN KEY([ExpenseAmountTypeId])
REFERENCES [dbo].[ExpenseAmountTypes] ([ExpenseAmountTypeId])
GO
ALTER TABLE [dbo].[Income] CHECK CONSTRAINT [Income_FK3]
GO
ALTER TABLE [dbo].[IncomeSourceTypes]  WITH CHECK ADD  CONSTRAINT [IncomeSourceTypes_FK1] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[IncomeSourceTypes] CHECK CONSTRAINT [IncomeSourceTypes_FK1]
GO
ALTER TABLE [dbo].[TransactionPeriods]  WITH CHECK ADD  CONSTRAINT [TransactionPeriods_FK] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[TransactionPeriods] CHECK CONSTRAINT [TransactionPeriods_FK]
GO
ALTER TABLE [dbo].[Transactions]  WITH CHECK ADD  CONSTRAINT [Transactions_FK1] FOREIGN KEY([TransactionPeriodId])
REFERENCES [dbo].[TransactionPeriods] ([TransactionPeriodId])
GO
ALTER TABLE [dbo].[Transactions] CHECK CONSTRAINT [Transactions_FK1]
GO
USE [master]
GO
ALTER DATABASE [SaveYourBacon] SET  READ_WRITE 
GO
