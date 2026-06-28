# Lingorx — 成就系统接口

> 成就系统包含 16 个成就，在 submit 时自动检查并解锁。

---

## 获取成就列表

```
GET /api/achievements
```

**需要登录** ✅
**Header**: `X-App-Code: lingorx`

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": 1,
      "title": "First Steps",
      "description": "Complete your first lesson.",
      "category": "Learning",
      "icon": "stadia_controller",
      "unlocked": false,
      "current": 1,
      "target": 1,
      "reward_description": "20 Coins"
    }
  ]
}
```

---

## Submit 时返回新成就

`POST /api/lessons/{id}/submit` 的响应中新增 `new_achievements` 字段：

```json
{
  "code": 0,
  "data": {
    "xp_earned": 50,
    "coins_earned": 10,
    "total_xp": 1520,
    "lesson_status": "completed",
    "next_lesson_status": "available",
    "new_achievements": [
      {
        "id": 1,
        "title": "First Steps",
        "description": "Complete your first lesson.",
        "reward_description": "20 Coins"
      }
    ]
  }
}
```

> 没有新成就时返回 `[]`。

---

## 16 个成就清单

| ID | 名称 | 条件 | 奖励 |
|:--:|------|------|:----:|
| 1 | First Steps | 完成第 1 个 lesson | 20 |
| 2 | Dedicated Learner | 完成 10 个 lesson | 50 |
| 3 | Scholar | 完成 25 个 lesson | 100 |
| 4 | Course Complete | 完整学完一门课程 | 50 |
| 5 | Comeback Kid | 旧记录 < 50% 且本次 ≥ 80% | 30 |
| 6 | Perfect Score | 本局 100% 准确率 | 50 |
| 7 | Sharp Mind | 累计 10 次 ≥ 80% | 100 |
| 8 | XP Starter | 累计 XP ≥ 500 | 50 |
| 9 | XP Hunter | 累计 XP ≥ 2000 | 150 |
| 10 | Word Novice | 累计答题 ≥ 100 | 30 |
| 11 | Word Master | 累计答题 ≥ 1000 | 100 |
| 12 | Quick Learner | 本局耗时 ≤ 30 秒 | 30 |
| 13 | On Fire | 连续学习 ≥ 7 天 | 50 |
| 14 | Unstoppable | 连续学习 ≥ 30 天 | 200 |
| 15 | First Check-in | 累计打卡 ≥ 1 | 10 |
| 16 | Dedicated Checker | 累计打卡 ≥ 30 | 100 |

> 解锁时金币自动发放到用户余额。
