create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('income', 'expense')),
  amount numeric(12,2) not null check (amount > 0),
  category text not null,
  entry_date date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);

alter table public.entries enable row level security;
create policy "Users can view their own entries" on public.entries for select using (auth.uid() = user_id);
create policy "Users can create their own entries" on public.entries for insert with check (auth.uid() = user_id);
create policy "Users can update their own entries" on public.entries for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can delete their own entries" on public.entries for delete using (auth.uid() = user_id);
