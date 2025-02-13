export const truncateText = (text: string, wordLimit: number) => {
  return (
    text.split(" ").slice(0, wordLimit).join(" ") +
    (text.split(" ").length > wordLimit ? "..." : "")
  );
};
