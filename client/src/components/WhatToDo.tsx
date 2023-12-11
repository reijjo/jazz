type Props = {
  header: string;
  children: string;
};

const WhatToDo = ({ header, children }: Props) => {
  const whatStyle = {
    position: "absolute" as const,
    zIndex: "2",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid var(--TEXT)",
    borderRadius: "8px",
    backgroundColor: "var(--WHITE)",
    boxShadow: "4px 4px 4px 0px var(--PRIMARY)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "250px",
    maxWidth: "350px",
    minHeight: "125px",
    padding: "8px 16px",
    pointerEvents: "none" as const,
  };

  return (
    <div style={whatStyle}>
      <h3>{header}</h3>
      <div>{children}</div>
    </div>
  );
};

export default WhatToDo;
