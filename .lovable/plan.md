

## Plan: Assign admin role to user

### What
Insert a row into `user_roles` table linking user `03d2ba60-7887-4c89-826c-47dedcdba31a` (r-nailya@mail.ru) to the `admin` role.

### How
Single SQL INSERT via the database insert tool:
```sql
INSERT INTO public.user_roles (user_id, role) VALUES ('03d2ba60-7887-4c89-826c-47dedcdba31a', 'admin');
```

### After
You can log in at `/admin/login` with email `r-nailya@mail.ru` and password `88888888`.

