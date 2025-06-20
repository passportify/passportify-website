
-- Insert admin role for the authenticated user
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'passportify.gpt@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Let's also check if there are any existing user roles
SELECT u.email, ur.role 
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
WHERE u.email = 'passportify.gpt@gmail.com';
