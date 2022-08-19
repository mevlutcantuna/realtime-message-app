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
