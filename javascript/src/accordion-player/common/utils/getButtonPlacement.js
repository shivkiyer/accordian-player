export default function getButtonPlacement({
  height,
  width,
  verticalSpace,
  horizontalSpace,
}) {
  const marginTop = (verticalSpace - height) / 2.0;
  const paddingLeft = (horizontalSpace - width) / 2.0;
  return {
    marginTop,
    paddingLeft,
    paddingRight: paddingLeft,
  };
}
