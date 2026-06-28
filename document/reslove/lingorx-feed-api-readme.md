# Lingorx — Feed 动态流接口

> 合并展示用户的学习动态：完成 lesson、每日打卡、解锁成就。

---

## 获取动态流

```
GET /api/feed?page=1&page_size=10
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
        "type": "lesson",
        "title": "Completed Present Tense",
        "detail": "English Grammar · 80% · 45s",
        "xp": 100,
        "coins": 16,
        "icon": "stadia_controller",
        "created_at": "2026-06-27T10:30:00Z"
      },
      {
        "type": "checkin",
        "title": "Daily check-in",
        "detail": "Day 7 streak",
        "xp": 0,
        "coins": 0,
        "icon": "edit_calendar",
        "created_at": "2026-06-27T10:31:00Z"
      },
      {
        "type": "achievement",
        "title": "Unlocked: First Steps",
        "detail": "Complete your first lesson.",
        "xp": 0,
        "coins": 20,
        "icon": "workspace_premium",
        "created_at": "2026-06-27T10:31:00Z"
      }
    ],
    "total": 50,
    "page": 1,
    "page_size": 10
  }
}
```

### type 对应

| type | 数据来源 | icon |
|---|---|---|
| `lesson` | lesson_records | `stadia_controller` |
| `checkin` | checkins | `edit_calendar` |
| `achievement` | user_achievements + achievements | `workspace_premium` |
