export default function Avatar({ width, height, url, onClick }) {
  return (
    <img
      style={{ width: width, height: height, cursor: "pointer" }}
      onClick={onClick}
      src={url}
      alt="default"
    />
  );
}
