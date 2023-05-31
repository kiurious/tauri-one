interface ChatMessageLoading {
  value: number;
}

const LoadingMessage = ({ value }: ChatMessageLoading) => {
  return (
    <div
      className="radial-progress p-2"
      style={{
        "--value": `${value.toString()}`,
        "--size": "2rem",
        "--thickness": "2px",
      }}
    ></div>
  );
};

export default LoadingMessage;
