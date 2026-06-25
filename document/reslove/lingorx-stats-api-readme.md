# Lingorx — 用户统计接口

> 返回用户学习统计数据，供 Dashboard / Statistics 页面展示。

---

## 获取统计数据

```
GET /api/stats
```

**需要登录** ✅ — `Authorization: Bearer <token>`
**Header**: `X-App-Code: lingorx`

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total_xp": 1520,
    "total_lessons": 12,
    "total_defeated": 12,
    "total_words_typed": 96,
    "total_time_seconds": 3600,
    "today_time_seconds": 180,
    "today_words": 15,
    "today_missions": [
      { "id": 1, "label": "Complete one battle", "done": true, "progress": "" },
      { "id": 2, "label": "Practice 10 minutes", "done": false, "progress": "3/10 min" },
      { "id": 3, "label": "Learn 20 words", "done": false, "progress": "15/20" },
      { "id": 4, "label": "Earn 50 XP", "done": false, "progress": "12/50" },
      { "id": 5, "label": "80%+ accuracy", "done": false, "progress": "75%" },
      { "id": 6, "label": "Login streak +1", "done": true, "progress": "" }
    ],
    "achievements": {
      "unlocked": 0,
      "total": 0
    },
    "streak_days": 7
  }
}
```

### 字段说明

| 字段 | 说明 |
|---|---|
| total_xp | 累计经验值 |
| total_lessons | 已完成 lesson 总数 |
| total_defeated | 总击败数（= total_lessons） |
| total_words_typed | 累计输入词数 |
| total_time_seconds | 累计学习时长（秒） |
| today_time_seconds | 今日学习时长（秒） |
| today_words | 今日输入词数 |
| today_missions | 今日任务列表，见下方 |
| achievements | 成就（暂未实现，永远返回 0） |
| streak_days | 连续学习天数 |

### 今日任务规则

| id | 条件 |
|----|------|
| 1 | 今日完成 lesson ≥ 1 |
| 2 | 今日学习时长 ≥ 600 秒 |
| 3 | 今日总题数 ≥ 20 |
| 4 | 今日获得 XP ≥ 50 |
| 5 | 今日平均准确率 ≥ 80% |
| 6 | 连续学习天数 ≥ 1 |
