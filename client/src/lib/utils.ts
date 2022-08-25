export const isLoggedin = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const generateLogo = (fullName: string = "") => {
  const nameArr = fullName?.split(" ");

  let first = nameArr[0]?.split("")[0];
  let last = nameArr[1]?.split("")[0];
  return (first && first) + (last ? last : "");
};

export const getTime = (time: Date) => {
  const date = new Date(time);
  let hour =
    date.getHours() >= 10 ? `${date.getHours()}` : `0${date.getHours()}`;
  let min =
    date.getMinutes() >= 10 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  return hour + ":" + min;
};
