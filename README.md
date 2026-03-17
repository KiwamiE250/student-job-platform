# Student Job Platform — backen d

студент может: 

- студент может зарегистрироваться;
- заполнить профиль;
- смотреть вакансии;
- откликаться на вакансии;
- добавлять вакансии в избранное;

работодатель может:

- зарегистрироваться;
- заполнить профиль компании;
- создавать вакансии;
- редактировать и удалять свои вакансии;
- смотреть отклики студентов;
- менять статус отклика;

администратор может:

- смотреть пользователей;
- блокировать и разблокировать пользователей;
- смотреть вакансии;
- удалять вакансии;
- управлять категориями.


что в общем реализовано: 

- регистрация и вход с ролями student / employer / admin
- профили студента и работодателя
- CRUD вакансий
- список всех вакансий и просмотр одной вакансии
- отклики: отправка, список студента, список работодателя, смена статуса
- избранное: добавить, удалить, получить список
- админка: пользователи, блокировка/разблокировка, вакансии, категории
- проверка ролей и блокировки пользователя
- базовая валидация и единый формат ответов API

## Где находятся backend routes

Все backend routes находятся здесь:

```bash
src/app/api/

src/app/api/
├── auth/
│   ├── register/route.ts
│   └── login/route.ts
│
├── profile/
│   ├── student/route.ts
│   ├── student/update/route.ts
│   ├── employer/route.ts
│   └── employer/update/route.ts
│
├── vacancies/
│   ├── route.ts
│   ├── create/route.ts
│   ├── my/route.ts
│   └── [id]/
│       ├── route.ts
│       ├── update/route.ts
│       └── delete/route.ts
│
├── applications/
│   ├── apply/route.ts
│   ├── student/route.ts
│   ├── employer/route.ts
│   └── status/route.ts
│
├── favorites/
│   ├── route.ts
│   ├── add/route.ts
│   └── remove/route.ts
│
├── admin/
│   ├── users/route.ts
│   ├── users/block/route.ts
│   ├── users/unblock/route.ts
│   ├── vacancies/route.ts
│   ├── vacancies/delete/route.ts
│   ├── categories/route.ts
│   ├── categories/create/route.ts
│   └── categories/delete/route.ts
│
└── test/route.ts
