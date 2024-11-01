export const calculator = (pastTime) => {
  const past = new Date(pastTime)
  const now = new Date()
  const timeDivideSet = [
    {
      divide: 1000,
      type: '초',
    },
    {
      divide: 1000 * 60,
      type: '분',
    },
    {
      divide: 1000 * 60 * 60,
      type: '시간',
    },
    {
      divide: 1000 * 60 * 60 * 24,
      type: '일',
    },
    {
      divide: 1000 * 60 * 60 * 24 * 30,
      type: '달',
    },
    {
      divide: 1000 * 60 * 60 * 24 * 30 * 365,
      type: '년',
    },
  ]

  for (const { divide, type } of timeDivideSet.reverse()) {
    const result = Math.trunc((now - past) / divide)
    if (result > 0) {
      return `${result}${type} 전`
    }
  }
  return '방금 전'
}
