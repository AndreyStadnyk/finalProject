insert into `users` (username, first_name, last_name, address, gender, password) values ('VPupkin', 'Vasya', 'Pupkin', 'New York', 'mail', 'qwerty');
insert into `users` (username, first_name, last_name, address, gender, password) values ('PMatroskin', 'Petya', 'Matroskin', 'Wuhan','mail', '12345');

insert into `posts` (author, owner, text) values ('PMatroskin', 'VPupkin', 'Some text from owner and author Matroskin');
insert into `posts` (author, owner, text) values ('PMatroskin', 'VPupkin', 'Some text from owner Pupkin and author Matroskin');
--insert into `posts` (author, owner, text)  values ('VPupkin', 'VPupkin', 'Some text from owner and author Pupkin') ;
