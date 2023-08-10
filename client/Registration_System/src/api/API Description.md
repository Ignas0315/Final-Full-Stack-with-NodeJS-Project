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