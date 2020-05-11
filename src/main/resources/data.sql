insert into `users` (username, email, first_name, last_name, address, gender, password) values ('VPupkin', 'Fs9finalProject@gmail.com', 'Vasya', 'Pupkin', 'New York', 'male', 'qwerty');
insert into `users` (username, email, first_name, last_name, address, gender, password) values ('KPupkin', 'Katya@gmail.com', 'Katya', 'Pupkin', 'New York', 'male', 'asdfg');
insert into `users` (username, email, first_name, last_name, address, gender, password) values ('PMatroskin', 'Petya@gmail.com', 'Petya', 'Matroskin', 'Wuhan','male', '12345');

insert into `posts` (post_id, author, owner, date, text) values (1, 'PMatroskin', 'VPupkin', '2020-1-1', '1Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (2, 'PMatroskin', 'VPupkin', '2020-1-1', '2Some text from owner Pupkin and author Matroskin');

insert into `comments` (id, text, post_id, username) values (1, 'It is a good idea, Matroskin', 1, 'VPupkin');
insert into `comments` (id, text, post_id, username) values (2, 'I know, Pupkin', 1, 'PMatroskin');

insert into `likes` (id, username, post_id) values (1, 'VPupkin', 1);
insert into `likes` (id, username, post_id) values (2, 'KPupkin', 1);

insert into `friend_requests` (id, requester, receiver) values (1, 'VPupkin', 'PMatroskin');

insert into `user_friends` (id, user1, user2) values (1, 'VPupkin', 'KPupkin');
insert into `user_friends` (id, user1, user2) values (2, 'KPupkin', 'VPupkin');


insert into `posts` (post_id, author, owner, date, text) values (3, 'PMatroskin', 'VPupkin', '2020-1-1', '3Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (4, 'PMatroskin', 'VPupkin', '2020-1-1', '4Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (5, 'PMatroskin', 'VPupkin', '2020-1-1', '5Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (6, 'PMatroskin', 'VPupkin', '2020-1-1', '6Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (7, 'PMatroskin', 'VPupkin', '2020-1-1', '7Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (8, 'PMatroskin', 'VPupkin', '2020-1-1', '8Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (9, 'PMatroskin', 'VPupkin', '2020-1-1', '9Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (10, 'PMatroskin', 'VPupkin', '2020-1-1', '10Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (11, 'PMatroskin', 'VPupkin', '2020-1-1', '11Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (12, 'PMatroskin', 'VPupkin', '2020-1-1', '12Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (13, 'PMatroskin', 'VPupkin', '2020-1-1', '13Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (14, 'PMatroskin', 'VPupkin', '2020-1-1', '14Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (15, 'PMatroskin', 'VPupkin', '2020-1-1', '15Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (16, 'PMatroskin', 'VPupkin', '2020-1-1', '16Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (17, 'PMatroskin', 'VPupkin', '2020-1-1', '17Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (18, 'PMatroskin', 'VPupkin', '2020-1-1', '18Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (19, 'PMatroskin', 'VPupkin', '2020-1-1', '19Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (20, 'PMatroskin', 'VPupkin', '2020-1-1', '20Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (21, 'PMatroskin', 'VPupkin', '2020-1-1', '21Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (22, 'PMatroskin', 'VPupkin', '2020-1-1', '22Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (23, 'PMatroskin', 'VPupkin', '2020-1-1', '23Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (24, 'PMatroskin', 'VPupkin', '2020-1-1', '24Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (25, 'PMatroskin', 'VPupkin', '2020-1-1', '24Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (26, 'PMatroskin', 'VPupkin', '2020-1-1', '26Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (27, 'PMatroskin', 'VPupkin', '2020-1-1', '27Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (28, 'PMatroskin', 'VPupkin', '2020-1-1', '28Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (29, 'PMatroskin', 'VPupkin', '2020-1-1', '29Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (30, 'PMatroskin', 'VPupkin', '2020-1-1', '30Some text from owner Pupkin and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (31, 'PMatroskin', 'VPupkin', '2020-1-1', '31Some text from owner and author Matroskin');
insert into `posts` (post_id, author, owner, date, text) values (32, 'PMatroskin', 'VPupkin', '2020-1-1', '32Some text from owner Pupkin and author Matroskin');