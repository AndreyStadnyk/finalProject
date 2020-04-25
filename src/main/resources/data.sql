insert into `users` (username, email, first_name, last_name, address, gender, password) values ('VPupkin', 'Fs9finalProject@gmail.com', 'Vasya', 'Pupkin', 'New York', 'male', 'qwerty');
insert into `users` (username, email, first_name, last_name, address, gender, password) values ('KPupkin', 'Katya@gmail.com', 'Katya', 'Pupkin', 'New York', 'male', 'asdfg');
insert into `users` (username, email, first_name, last_name, address, gender, password) values ('PMatroskin', 'Petya@gmail.com', 'Petya', 'Matroskin', 'Wuhan','male', '12345');

insert into `posts` (post_id, author, owner, date, text) values (1, 'PMatroskin', 'VPupkin', '2020-1-1', 'Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (2, 'PMatroskin', 'VPupkin', '2020-1-1', 'Some text from owner Pupkin and author Matroskin');

insert into `comments` (id, text, post_id, username) values (1, 'It is a good idea, Matroskin', 1, 'VPupkin');
insert into `comments` (id, text, post_id, username) values (2, 'I know, Pupkin', 1, 'PMatroskin');

insert into `likes` (id, username, post_id) values (1, 'VPupkin', 1);
insert into `likes` (id, username, post_id) values (2, 'KPupkin', 1);

insert into `friend_requests` (id, requester, receiver) values (1, 'VPupkin', 'PMatroskin');

insert into `user_friends` (id, user1, user2) values (1, 'VPupkin', 'KPupkin');
insert into `user_friends` (id, user1, user2) values (2, 'KPupkin', 'VPupkin');
