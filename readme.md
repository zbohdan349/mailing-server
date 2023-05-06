
## Intro

HighRise catalog service

## Environment variable

| Name  | Description |
| ------------- | ------------- |
| DATABASE_URL  | Url to the database |
| NATS_URL      | Url to the NATS server  |

## Deploing
1.Configure `.env`

2.Choose the next option:

```bash
# development
$ npm run migrate:dev
$ npm run start:dev

# production mode

$ npm run start:migrate:prod
```
## Endpoits

| Event  | Request | Response | Description |Response status header|
| ------------- | ------------- | ------------- | ------------- |------------- |
|admin.permission.create   | *permission     | *permission   | Creates new  `Permission`| 200 [400,409,500]
|admin.permission.get.one  | *permission     | *permission   | Returns the `Permission` if it exists| 200 [400,404,500]
|admin.permission.get.all  | empty           |PermissionListResponse  |Returns the list with all exsisting `Permission`| 200 [500]
|admin.permission.update   | UpdatePermissionRequest | *permission   | Updates exsisting `Permission`| 200 [400,404,409,500]
|admin.permission.delete   | *permission     | *permission | Deletes exsisting `Permission `| 200 [400,404,500]
|admin.permission.give     | UserPermissionResponse      | UserPermissionResponse | Creates new `UserPermission`| 200 [400,404,409,500]
|admin.permission.revoke   | UserPermissionResponse      | UserPermissionResponse | Deletes exsisting `UserPermission`| 200 [400,404,500]
|admin.permission.for      | *id        |UserPermissionsResponse|Returns all `Permission` for one `User`| 200 [400,404,500]
|admin.permission.for.token| *id        |UserPermissionsResponse|Returns all `Permission` for one `User`| 200 [400,404,500]
|admin.permission.for.all  | empty     |UsersPermissionsResponse|Returns all `Permission` for all `User`| 200 [500]
|admin.user.create         | CreateUserRequest       |UserResponse|Creates new  `User`| 200 [400,409,500]
|admin.user.update         | UserResponse       |UserResponse|Updates exsisting `User`| 200 [400,404,409,500]
|admin.user.get.one        | *token | UserResponse | Return exsisting `User`| 200 [400,404,500]
|admin.user.get.one.admin  | *token | UserResponse | Return exsisting `User` where `User.role` == `ADMIN`| 200 [400,404,500]
|admin.balance.for         | *userId | ManagerBalanceResponse | Return exsisting `ManagerBalance`|200 [400,404,500]
|admin.balance.set         | ManagerBalanceResponse | ManagerBalanceResponse | set `ManagerBalance`| 200 [400,404,500]


## Status codes
| Event  | Request |
| ------------- | ------------- |
|200| OK|
|400 |Bad request|
|404 |Not found|
|409 |Conflict|
|500 | Internal server error|