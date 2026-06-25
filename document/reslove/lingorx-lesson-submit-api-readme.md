# Lingorx — Typing Battle 结算接口

> 用户完成一局 Typing Battle 后，提交结算。

---

## 提交结算

```
POST /api/lessons/{lesson_id}/submit
```

**需要登录** ✅ — `Authorization: Bearer <token>`
**Header**: `X-App-Code: lingorx`

### 请求体

```json
{
  "correct_count": 8,
  "wrong_count": 2,
  "total_questions": 10,
  "total_time_seconds": 45
}
```

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| correct_count | int | ✅ | 答对题数 |
| wrong_count | int | ✅ | 答错题数 |
| total_questions | int | ✅ | 总题数 |
| total_time_seconds | int | ✅ | 游戏耗时（秒） |

### 成功响应

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "xp_earned": 50,
    "coins_earned": 10,
    "total_xp": 1520,
    "lesson_status": "completed",
    "next_lesson_status": "available"
  }
}
```

| 字段 | 类型 | 说明 |
|---|---|---|
| xp_earned | number | 本局获得的经验值 |
| coins_earned | number | 本局获得的金币 |
| total_xp | number | 累计总经验值（前端直接更新显示） |
| lesson_status | string | `completed` |
| next_lesson_status | string / null | 下一课状态：`available` / `null`（最后一课） |

### 说明

- 首次完成：正常记录并发放 XP/Coin
- 再次学习：不记录、不发奖励，`xp_earned` / `coins_earned` 返回 0

### 失败场景

| code | message | 说明 |
|---|---|---|
| 400 | "Lesson not found" | lesson 不存在 |

### XP / Coin 计算公式

```
accuracy = correct_count / (correct_count + wrong_count)
accuracy_bonus = accuracy ≥ 0.8 → 20  |  accuracy ≥ 0.5 → 10  |  其他 → 0

xp_earned   = correct_count × 10 + accuracy_bonus
coins_earned = correct_count × 2
```

### 前端对接

1. `play.vue` `onMounted` 时记录 `startTime`
2. 完成游戏时计算 `total_time_seconds`
3. 调 `POST /api/lessons/{lesson_id}/submit`
4. 结算弹窗显示 `xp_earned`、`coins_earned`
5. "Back to Course" 返回课程详情页
