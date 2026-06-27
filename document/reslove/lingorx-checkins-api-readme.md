# Lingorx — Check-ins 打卡流接口

> 每次完成 lesson 后自动生成打卡记录。

---

## 获取打卡流

```
GET /api/checkins?page=1&page_size=4
```

**需要登录** ✅
**Header**: `X-App-Code: lingorx`

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "data": [
      {
        "user": {
          "nickname": "LINGORX_aB3x",
          "avatar": "https://www.kaoiki.com/default.webp"
        },
        "lesson": "Greetings",
        "course": "English Beginner",
        "type": "learned",
        "accuracy": 40,
        "time": 45,
        "xp": 30,
        "coins": 10,
        "created_at": "2026-06-25T01:04:37Z"
      }
    ],
    "total": 12,
    "page": 1,
    "page_size": 4
  }
}
```

### type 说明

| 值 | 含义 |
|---|---|
| `learned` | 首次学习 |
| `reviewed` | 复习（本次准确率 ≥ 50%） |
| `retried` | 重学（本次准确率 < 50%） |

---

## 获取 30 天活跃度

```
GET /api/checkins/activity
```

**需要登录** ✅
**Header**: `X-App-Code: lingorx`

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "days": [0, 2, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
}
```

### 计算方式

- 按 `created_at` 统计每天打卡次数
- 活跃度 = `min(round(sqrt(打卡次数)), 10)`，范围 0-10
- 最近 30 天（含今天），按日期升序
