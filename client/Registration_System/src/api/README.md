# Registration System API example

## Login

### Request

`POST /login`

**Parameters**

| Name       | Type   | In   | Required | Description   |
| ---------- | ------ | ---- | -------- | ------------- |
| `email`    | string | body | Yes      | Email Address |
| `password` | string | body | Yes      | Password      |

Example request body:

```
{
    "email": "albin@mail.com",
    "password": "nvoksandvkonsvlkcndaslkv"
}

### Response Example

    HTTP/1.1 200 OK
    Date: Sat, 05 Aug 2023 16:52:30 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 169

    [
        {
            "token": "eyJhbGciOi..."
        }
    ]
```

## Admin

### Get all admins in the database

`GET /admin`

**Parameters**

| Name            | Type   | In     | Required | Description   |
| --------------- | ------ | ------ | -------- | ------------- |
| `Authorization` | string | header | Yes      | Authorization |

### Gets admin by id

`GET /admin/:id`

**Parameters**

| Name            | Type    | In     | Required | Description        |
| --------------- | ------- | ------ | -------- | ------------------ |
| `Authorization` | string  | header | Yes      | Authorization      |
| `id`            | integer | path   | Yes      | Specifies admin ID |

### Delete admin

`DELETE /admin/:id`

**Parameters**

| Name            | Type    | In     | Required | Description        |
| --------------- | ------- | ------ | -------- | ------------------ |
| `Authorization` | string  | header | Yes      | Authorization      |
| `id`            | integer | path   | Yes      | Specifies admin ID |

### Update admin

`PATCH /admin/:id`

**Parameters**

| Name            | Type    | In     | Required | Description                |
| --------------- | ------- | ------ | -------- | -------------------------- |
| `Authorization` | string  | header | Yes      | Authorization              |
| `id`            | integer | path   | Yes      | Specifies admin ID         |
| `email`         | string  | body   | Yes      | Specifies admin email      |
| `password`      | string  | body   | Yes      | Specifies admin password   |
| `first_name`    | string  | body   | Yes      | Specifies admin first name |
| `last_name`     | string  | body   | Yes      | Specifies admin last name  |

### Update admin

`POST /admin/register`

**Parameters**

| Name            | Type    | In     | Required | Description                |
| --------------- | ------- | ------ | -------- | -------------------------- |
| `Authorization` | string  | header | Yes      | Authorization              |
| `id`            | integer | path   | Yes      | Specifies admin ID         |
| `email`         | string  | body   | Yes      | Specifies admin email      |
| `password`      | string  | body   | Yes      | Specifies admin password   |
| `first_name`    | string  | body   | Yes      | Specifies admin first name |
| `last_name`     | string  | body   | Yes      | Specifies admin last name  |
