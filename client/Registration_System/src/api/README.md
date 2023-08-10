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

### Create new admin

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

## Events

### Get all events in the database

`GET /events`

**Parameters**

| Name            | Type   | In     | Required | Description   |
| --------------- | ------ | ------ | -------- | ------------- |
| `Authorization` | string | header | Yes      | Authorization |

### Gets specific events participants by event id

`GET /events/participants/:id`

**Parameters**

| Name            | Type    | In     | Required | Description        |
| --------------- | ------- | ------ | -------- | ------------------ |
| `Authorization` | string  | header | Yes      | Authorization      |
| `id`            | integer | path   | Yes      | Specifies event ID |

### Gets events by its id

`GET /events/:id`

**Parameters**

| Name            | Type    | In     | Required | Description        |
| --------------- | ------- | ------ | -------- | ------------------ |
| `Authorization` | string  | header | Yes      | Authorization      |
| `id`            | integer | path   | Yes      | Specifies event ID |

### Create new event

`POST /events`

**Parameters**

| Name            | Type   | In     | Required | Description                 |
| --------------- | ------ | ------ | -------- | --------------------------- |
| `Authorization` | string | header | Yes      | Authorization               |
| `name`          | string | body   | Yes      | Specifies event name        |
| `date`          | date   | body   | Yes      | Specifies event date        |
| `description`   | string | body   | Yes      | Specifies event description |
| `city`          | string | body   | Yes      | Specifies event city        |
| `country`       | string | body   | Yes      | Specifies event country     |
| `image`         | string | body   | Yes      | Specifies event image       |

### Delete event

`DELETE /events/:id`

**Parameters**

| Name            | Type    | In     | Required | Description        |
| --------------- | ------- | ------ | -------- | ------------------ |
| `Authorization` | string  | header | Yes      | Authorization      |
| `id`            | integer | path   | Yes      | Specifies event ID |

### Edit event

`PATCH /events`

**Parameters**

| Name            | Type   | In     | Required | Description                 |
| --------------- | ------ | ------ | -------- | --------------------------- |
| `Authorization` | string | header | Yes      | Authorization               |
| `name`          | string | body   | Yes      | Specifies event name        |
| `date`          | date   | body   | Yes      | Specifies event date        |
| `description`   | string | body   | Yes      | Specifies event description |
| `city`          | string | body   | Yes      | Specifies event city        |
| `country`       | string | body   | Yes      | Specifies event country     |
| `image`         | string | body   | Yes      | Specifies event image       |

## Participants

### Get all unique participants in the database

`GET /participants/unique`

**Parameters**

| Name            | Type   | In     | Required | Description   |
| --------------- | ------ | ------ | -------- | ------------- |
| `Authorization` | string | header | Yes      | Authorization |

### Get all participant entries in the database

`GET /participants`

**Parameters**

| Name            | Type   | In     | Required | Description   |
| --------------- | ------ | ------ | -------- | ------------- |
| `Authorization` | string | header | Yes      | Authorization |

### Gets participant by id

`GET /participants/:id`

**Parameters**

| Name            | Type    | In     | Required | Description              |
| --------------- | ------- | ------ | -------- | ------------------------ |
| `Authorization` | string  | header | Yes      | Authorization            |
| `id`            | integer | path   | Yes      | Specifies participant ID |

### Create new participation entry

`POST /participants`

**Parameters**

| Name            | Type    | In     | Required | Description                      |
| --------------- | ------- | ------ | -------- | -------------------------------- |
| `Authorization` | string  | header | Yes      | Authorization                    |
| `event_id`      | integer | body   | Yes      | Specifies event id               |
| `first_name`    | string  | body   | Yes      | Specifies participant first name |
| `last_name`     | string  | body   | Yes      | Specifies participant last name  |
| `city`          | string  | body   | Yes      | Specifies participant email      |
| `dob`           | date    | body   | Yes      | Specifies date of birth          |

### Delete participant by id

`DELETE /participants/:id`

**Parameters**

| Name            | Type    | In     | Required | Description              |
| --------------- | ------- | ------ | -------- | ------------------------ |
| `Authorization` | string  | header | Yes      | Authorization            |
| `id`            | integer | path   | Yes      | Specifies participant ID |

### Edit new participation entry

`PATCH /participant/:id`

**Parameters**

| Name            | Type    | In     | Required | Description                      |
| --------------- | ------- | ------ | -------- | -------------------------------- |
| `Authorization` | string  | header | Yes      | Authorization                    |
| `event_id`      | integer | body   | Yes      | Specifies event id               |
| `first_name`    | string  | body   | Yes      | Specifies participant first name |
| `last_name`     | string  | body   | Yes      | Specifies participant last name  |
| `city`          | string  | body   | Yes      | Specifies participant email      |
| `dob`           | date    | body   | Yes      | Specifies date of birth          |

### Get specific participant events

`GET /participant-events/:id`

**Parameters**

| Name            | Type    | In     | Required | Description              |
| --------------- | ------- | ------ | -------- | ------------------------ |
| `Authorization` | string  | header | Yes      | Authorization            |
| `id`            | integer | path   | Yes      | Specifies participant ID |
