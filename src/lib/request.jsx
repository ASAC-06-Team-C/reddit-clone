export default function request() {
  const requestObject = {
    title: titleRef?.current?.value,
    text: textRef?.current.getInstance().getMarkdown(),
  }
  console.log(requestObject)
}
