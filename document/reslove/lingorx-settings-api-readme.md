# Lingorx — 用户设置接口说明

> Base URL: `https://www.heartbeat.cool:2248`
> Header: `X-App-Code: lingorx`
> 所有接口需要登录：`Authorization: Bearer <token>`

---

## 1. 获取用户资料

```
GET /api/profile
```

**成功响应**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "nickname": "LINGORX_aB3x",
    "avatar": "https://www.kaoiki.com/default.webp",
    "bio": null,
    "google_bound": false
  }
}
```

> 头像、bio 可在修改资料时更新。

---

## 2. 修改昵称

```
PUT /api/profile
```

**请求体**

```json
{
  "nickname": "新昵称"
}
```

| 字段 | 必填 | 约束 |
|---|---|---|
| nickname | ✅ | 至少 1 位 |

**成功响应**

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "nickname": "新昵称",
    "bio": null
  }
}
```

> 前端同步更新本地存储中的 nickname。

---

## 3. 修改密码（已登录态）

```
PUT /api/auth/password/change
```

**请求体**

```json
{
  "current_password": "当前密码",
  "new_password": "新密码"
}
```

| 字段 | 约束 |
|---|---|
| new_password | **至少 8 位** |

**成功响应**

```json
{
  "code": 0,
  "message": "Password updated successfully",
  "data": {}
}
```

> 修改成功后不清除登录状态，无需重新登录。

---

## 4. 注销账号

```
DELETE /api/account
```

**请求体**

```json
{
  "password": "当前密码"
}
```

**成功响应**

```json
{
  "code": 0,
  "message": "Account has been deactivated",
  "data": {}
}
```

> **逻辑删除**：账号标记为已注销，数据保留但不可登录。
> 前端收到成功响应后清除所有本地存储，跳转到首页。

---

## 错误码速查

| code | message | 说明 |
|---|---|---|
| 400 | "Nickname is required" | 昵称传了空值 |
| 400 | "Current password is incorrect" | 当前密码错误 |
| 400 | "New password must be at least 8 characters" | 新密码太短 |
| 400 | "Password is incorrect" | 注销时密码验证失败 |
| 400 | "Account already deactivated" | 账号已注销 |
| 401 | "token invalid / expired" | 未登录或 token 过期 |
