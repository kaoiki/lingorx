# 通用反馈接口说明

> 适用于 doxie / 8bit / lingorx 所有平台
> Base URL: `https://www.heartbeat.cool:2248`
> 需要登录：`Authorization: Bearer <token>`

---

## 提交反馈

用户提交意见、建议、问题等。

```
POST /api/feedback
```

**Header**

| Header | 必填 | 说明 |
|---|---|---|
| X-App-Code | ✅ | `doxie` / `8bit` / `lingorx` |
| Authorization | ✅ | `Bearer <token>` |

**请求体**

```json
{
  "category": "suggestion",
  "content": "希望增加夜间模式"
}
```

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| category | string | ✅ | 分类，如 `bug` / `suggestion` / `question` / `other` |
| content | string | ✅ | 反馈内容 |

**成功响应**

```json
{
  "code": 0,
  "message": "Feedback submitted",
  "data": {}
}
```

---

## 分类建议

| category | 说明 |
|---|---|
| bug | 功能异常、报错 |
| suggestion | 功能建议 |
| question | 使用疑问 |
| other | 其他 |

> category 字段暂不校验，前端自由传值即可。
