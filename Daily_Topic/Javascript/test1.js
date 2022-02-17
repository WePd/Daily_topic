const root = {
  key: "A1",
  children: [
    {
      key: "B1",
      children: [
        {
          key: "C1",
          children: [],
        },
        {
          key: "C2",
          children: [],
        },
      ],
    },
    {
      key: "B2",
      children: [
        {
          key: "C3",
          children: [],
        },
        {
          key: "C4",
          children: [],
        },
      ],
    },
  ],
}
const walk = (dom) => {
  console.log(dom.key)
  dom.children.forEach((child) => walk(child))
}
walk(root)
