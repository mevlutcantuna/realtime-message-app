export const isLoggedin = () => {
  const token = localStorage.getItem("token");
  if (token) return true;
  else return false;
};

export const generateLogo = (fullName: string = "") => {
  let logo = "";
  const nameArr = fullName.split(" ");

  for (let i = 0; i < nameArr.length; i++) {
    logo += nameArr[i].split("")[0];
  }
  return logo;
};
