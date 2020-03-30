insert into `users` (username, email, first_name, last_name, address, gender, password) values ('VPupkin', 'Fs9finalProject@gmail.com', 'Vasya', 'Pupkin', 'New York', 'mail', 'qwerty');
insert into `users` (username, email, first_name, last_name, address, gender, password) values ('KPupkin', 'Katya@gmail.com', 'Katya', 'Pupkin', 'New York', 'mail', 'asdfg');
insert into `users` (username, email, first_name, last_name, address, gender, password) values ('PMatroskin', 'Petya@gmail.com', 'Petya', 'Matroskin', 'Wuhan','mail', '12345');

insert into `posts` (post_id, author, owner, date, text) values (1, 'PMatroskin', 'VPupkin', '2020-1-1', 'Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (2, 'PMatroskin', 'VPupkin', '2020-1-1', 'Some text from owner Pupkin and author Matroskin');

insert into `comments` (id, text, post_id, username) values (1, 'It is a good idea, Matroskin', 1, 'VPupkin');
insert into `comments` (id, text, post_id, username) values (2, 'I know, Pupkin', 1, 'PMatroskin');
