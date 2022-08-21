export const isLoggedin = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const generateLogo = (fullName: string = "") => {
  let logo = "";
  const nameArr = fullName.split(" ");

  for (let i = 0; i < nameArr.length; i++) {
    logo += nameArr[i].split("")[0];
  }
  return logo;
};

export const getTime = (time: Date) => {
  const date = new Date(time);
  let hour =
    date.getHours() >= 10 ? `${date.getHours()}` : `0${date.getHours()}`;
  let min =
    date.getMinutes() >= 10 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  console.log(hour, min);
  return hour + ":" + min;
};
