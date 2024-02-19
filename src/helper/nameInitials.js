export function getInitials(name) {
  if (name.split(" ").length === 1) {
    return name.charAt(0).toUpperCase();
  }

  const words = name.split(" ");

  let initials = "";

  words.forEach((word) => {
    initials += word.charAt(0);
  });

  return initials.toUpperCase();
}
