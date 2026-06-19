# Lingorx — 登录 / 注册 / 找回密码 接口说明

> Base URL: `https://www.heartbeat.cool:2248`
> Header: `X-App-Code: lingorx`（所有接口都要传）

---

## 1. 注册

先发送验证码，再提交注册。

### 1.1 发送注册验证码

```
POST /api/auth/register/send-code
```

**请求体**

```json
{ "email": "user@example.com" }
```

**成功响应**

```json
{ "code": 0, "message": "success" }
```

验证码发到邮箱，5分钟内有效。

---

### 1.2 提交注册

```
POST /api/auth/register
```

**请求体**

```json
{
  "email": "user@example.com",
  "password": "your_password",
  "code": "123456"
}
```

| 字段 | 约束 |
|---|---|
| password | 至少 6 位 |
| code | 邮箱收到的 6 位验证码 |

**成功响应**

```json
{ "code": 0, "message": "success" }
```

> 注册后不会自动登录，需要调登录接口拿 token。

---

## 2. 登录

```
POST /api/auth/login
```

**请求体**

```json
{
  "email": "user@example.com",
  "password": "your_password"
}
```

**成功响应**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "user_id": "uuid",
    "email": "user@example.com",
    "nickname": "LINGORX_aB3x",
    "avatar": "https://www.kaoiki.com/default.webp",
    "token": "base64url-random-string",
    "expires_at": "2026-04-22T12:00:00+00:00"
  }
}
```

> token 有效期 7 天，后续请求需带上 `Authorization: Bearer <token>`。

---

## 3. 找回密码

### 3.1 发送重置验证码

```
POST /api/auth/password/send-code
```

**请求体**

```json
{ "email": "user@example.com" }
```

**成功响应**

```json
{ "code": 0, "message": "success" }
```

---

### 3.2 重置密码

```
POST /api/auth/password/reset
```

**请求体**

```json
{
  "email": "user@example.com",
  "code": "123456",
  "new_password": "new_password123"
}
```

| 字段 | 约束 |
|---|---|
| code | 邮箱收到的 6 位验证码 |
| new_password | 至少 6 位 |

**成功响应**

```json
{ "code": 0, "message": "success" }
```

---

## 通用说明

**响应格式**

```json
{ "code": 0, "message": "success", "data": {} }
```

- `code: 0` 表示成功，非 0 表示失败
- `message` 为错误描述

**错误码速查**

| code | message | 说明 |
|---|---|---|
| 400 | "Password must be at least 6 characters" | 密码太短 |
| 400 | "Email already registered" | 邮箱已被注册 |
| 400 | "Invalid or expired code." | 验证码错误或过期 |
| 400 | "Invalid email or password" | 邮箱或密码错误 |
| 401 | "token invalid / expired" | token 无效或过期 |
