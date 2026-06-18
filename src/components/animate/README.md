# Animate

全局动效组件，基于 [reactbits.dev](https://reactbits.dev/animations) 转写。

## Noise

全屏噪点雪花效果，类似胶片颗粒纹理。

```vue
<Noise :opacity="0.15" :grain-size="2" :fps="6" :contained="false" />
```

| 参数 | 默认值 | 说明 |
|---|---|---|
| `opacity` | 0.15 | 噪点透明度 |
| `grain-size` | 2 | 噪点颗粒大小 (px) |
| `fps` | 6 | 刷新帧率，越低颗粒闪烁感越强 |
| `contained` | false | `false` 固定全屏 / `true` 限制在父容器内 |
| `z-index` | 100 | 层级 |

### contained 模式

父容器需 `position: relative; overflow: hidden;`，Noise 会限制在容器范围内：

```vue
<div class="relative overflow-hidden">
  <Noise :contained="true" :opacity="0.2" />
</div>
```

## TextType

打字机逐字出现动效。

```vue
<TextType
  :text="['Hello', 'World']"
  :typing-speed="60"
  :loop="true"
  :show-cursor="true"
  cursor-character="▍"
/>
```

| 参数 | 默认值 | 说明 |
|---|---|---|
| `text` | — | 字符串或字符串数组（数组会循环） |
| `typing-speed` | 50 | 打字速度 (ms/字) |
| `deleting-speed` | 30 | 删除速度 (ms/字) |
| `pause-duration` | 2000 | 打字完成后停顿时间 (ms) |
| `loop` | true | 是否循环 |
| `show-cursor` | true | 显示光标 |
| `cursor-character` | \| | 光标字符 |
| `reverse-mode` | false | 反转文字方向 |
| `start-on-visible` | false | 进入视口后才开始播放 |
