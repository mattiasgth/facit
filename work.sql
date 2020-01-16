select TI.WhoId, sum(Amount) from [TransactionItem] TI
  inner join [Transaction] T ON TI.TransactionId = T.Id
where T.ProjectId = 1
  group by TI.WhoId

select * from TransactionItem