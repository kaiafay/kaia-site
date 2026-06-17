begin;

truncate table bookings;

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_name = 'bookings'
      and column_name = 'project_description'
  ) and not exists (
    select 1
    from information_schema.columns
    where table_name = 'bookings'
      and column_name = 'notes'
  ) then
    alter table bookings rename column project_description to notes;
  end if;
end $$;

alter table bookings
  drop column if exists business_name,
  drop column if exists website_url,
  drop column if exists budget_range;

alter table bookings
  alter column notes drop not null;

commit;
