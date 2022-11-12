const convertNodeNames = (name) => {
  const mapName = {
    Start: "شروع",
    Announcement: "اعلان",
    Action: "عملکرد",
    Question: "سوال",
    Checker: "چکر",
    End: "پایان",
  };
  return mapName[name] || name;
};

export default convertNodeNames;
