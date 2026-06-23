# Courses Detail 课程详情页面 — 接口需求

## 页面需求

展示某个课程的 lesson 列表，每个 lesson 可点击进入 Typing Battle。

## 接口

### GET /api/courses/{course_id}/lessons

返回指定课程下的 lesson 列表，包含每个 lesson 的学习状态。

**成功响应**

```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": "lesson-uuid",
      "title": "Daily Objects",
      "description": "Common words for everyday items.",
      "sequence": 1,
      "status": "completed"
    },
    {
      "id": "lesson-uuid",
      "title": "Weather & Seasons",
      "description": "Talk about the weather and seasons.",
      "sequence": 5,
      "status": "available"
    },
    {
      "id": "lesson-uuid",
      "title": "Time & Numbers",
      "description": "Tell time, count, and use numbers.",
      "sequence": 6,
      "status": "locked"
    }
  ]
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|---|---|---|
| id | string | lesson UUID |
| title | string | lesson 名称 |
| description | string | 简短描述 |
| sequence | number | 排序序号（从 1 开始） |
| status | string | `available` / `locked` / `completed` |

### status 说明

| 值 | 含义 | 前端展示 |
|---|---|---|
| `available` | 可学习（前一课已完成） | 可点击进入 |
| `locked` | 锁定（前一课未完成） | 不可点击，显示锁图标 |
| `completed` | 已完成 | 显示勾选标记 |

### 备注

- 接口需要登录：`Authorization: Bearer <token>`
- Header 需带：`X-App-Code: lingorx`
- 返回数据按 `sequence` 升序
