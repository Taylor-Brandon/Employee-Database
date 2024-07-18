INSERT INTO department (id, name)
VALUES  (001, "Potions"),
        (002, "Divination"),
        (003, "Charms"),
        (004, "Dark Arts"),
        (005, "Herbology"),
        (006, "Other");

INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "Potions Professor", 100000, 001),
        (002, "HeadMaster", 200000, 006),
        (003, "Professor of Defense Against the Dark Arts", 150000, 002),
        (004, "Muggle Studies", 75000, 006),
        (005, "Divination Instructor", 100000, 002),
        (006, "Herbology Professor", 100000, 005);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (001, "Albus", "Dumbledoor", 002, 001),
        (002, "Severus", "Snape", 003, 002),
        (003, "Horace", "Slughorn", 001, 003),
        (004, "Pomona", "Sprout", 006, 004),
        (005, "Sybill", "Trelawney", 005, 005);
