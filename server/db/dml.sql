INSERT INTO users (name, email, password, role)
VALUES ('Parent User', 'parent@example.com', 'hashedpassword', 'parent')
ON CONFLICT (email) DO NOTHING;

INSERT INTO users (name, email, password, role)
VALUES ('Child User', 'child@example.com', 'hashedpassword', 'child')
ON CONFLICT (email) DO NOTHING;

INSERT INTO tasks (title, description, assigned_to, created_by, due_date, status)
SELECT 'Feed the Fish', 'Feed the fish daily.', 
       (SELECT user_id FROM users WHERE email = 'child@example.com'),
       (SELECT user_id FROM users WHERE email = 'parent@example.com'),
       '2024-09-10 10:00:00', 'pending'
WHERE NOT EXISTS (
    SELECT 1 FROM tasks WHERE title = 'Feed the Fish' AND assigned_to = (SELECT user_id FROM users WHERE email = 'child@example.com')
);