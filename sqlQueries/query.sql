
create extension if not exists "uuid-ossp";

create table products (
	id uuid primary key default uuid_generate_v4(),
	title text not null,
	description text,
	price int
);

create table stock (
	product_id uuid,
	foreign key ("product_id") references "products" ("id"),
	"count" int
);


insert into products (title, description, price, image)
values('P-51 Mustang', 
'North American P-51 Mustang WWII period fighter', 
1780000, 
'https://wallpapermemory.com/uploads/654/north-american-p-51-mustang-background-hd-1920x1080-53134.jpg' 
);

insert into products (title, description, price, image)
values('Supermarine Spitfire mk.V',
'Supermarine Spitfire mk.V WWII period fighter',
1810000,
'https://wallpapermemory.com/uploads/154/supermarine-spitfire-background-hd-1080p-390900.jpg'
);

insert into products (title, description, price, image)
values (
'B-17 Flying Fortress',
'Boeing B-17H Flying Fortress WWII period bomber',
4500000,
'https://wallpapermemory.com/uploads/204/boeing-b-17-flying-fortress-wallpaper-1080p-214212.jpg'
);

insert into stock (product_id, count)
values('f2ebd06b-b4b6-49e4-bda5-fdefe6ee2e10', 4);

insert into stock (product_id, count)
values('d0534a95-be2e-478c-b512-4552d412e6af', 6);

insert into stock (product_id, count)
values('94e5d489-3308-466a-8078-3b7ed7f0c2de', 2);