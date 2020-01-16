/* add people */
insert into Person(FirstName, LastName, BirthDate, Email1, Phone1)
values
('Mattias', 'Göthe', '1969-04-24', 'mattiasgth@outlook.com', '+46 709 322 922'),
('Carola', 'Karlsson', '1980-01-01', 'carola@example.com', '+46 709 123 456 922'),
('Marcus', 'Lådö', '1975-01-01', 'marcus@example.com', '+46 709 888 999'),
('Elizabeth', 'Göthe', '1980-01-01', 'elisabet@example.com', '+46 709 999 000');
/* add currencies */
insert into Currency(Code, Rate)
values
('SEK', 1.0),
('ZAR', 0.6581);
/* add projects */
insert into Project(Description, CreatedWhen, CreatedById, IsActive, BaseCurrencyId)
values('Sydafrika 2019/20', '2019-12-22', 1, 1, 1);
