// 科目配置 — schema 说明见 README「如何添加新科目」
window.QUIZ_SUBJECT = {
  id: 'computer-organization',            // 存储前缀,与目录名一致
  name: '计组 · 模拟题',
  subtitle: 'Computer Organization Quiz',
  types: ['单选题', '填空题', '判断题', '简答题'],  // 筛选按钮与答题卡分组顺序
  total: 350,                             // 首页进度展示用
  legacyProgressKey: 'quiz-progress',     // 旧版无前缀的进度 key,首次启动自动迁移
};
