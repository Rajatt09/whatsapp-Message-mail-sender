const users = [
  // {
  //   phoneNo: "8595842343",
  //   email: "hello.first93@gmail.com",
  //   name: " Rajat ",
  //   pref1: "randi",
  //   pref2: "randi(utkarsh)"
  // },
  // {
  //   phoneNo: "7439557090",
  //   email: "rajatbhati9339@gmail.com",
  //   name: "Sai Raj",
  // },
  // {
  //   phoneNo: "8570940287",
  //   email: "22103217@mail.jiit.ac.in",
  //   name: "Yash",
  //   pref1: "tech",
  //   pref2: "management"
  // },
  // {
  //   phoneNo: "8383936346",
  //   name: "Harsh",
  //   pref1: "tech",
  //   pref2: "tech",
  //   email: "mittalyas1234@gmail.com"
  // },
  // {
  //   phoneNo: "8210182505",
  //   email: "22103099@mail.jiit.ac.in",
  //   name: "utkarsh",
  //   pref1: "gand dena",
  //   pref2: "gand dena"
  // }
  // {
  //   phoneNo: "9026152678",
  //   email: "22102151@mail.jiit.ac.in",
  //   name: "Shantanu Pandey"

  // }
  // {
  //   phoneNo: "8273270184",
  //   email: "22103239@mail.jiit.ac.in",
  //   name: "Yash Agarwal"
  // },

  {
    "name": "Yuwanshi Vats",
    "email": "yuwanshivats@gmail.com ",
    "phoneNo": 9818485489,
    "pref1": "Digital/Cinematography",
    "pref2": "Management"
  },
  {
    "name": "Aakarsh shrivastava",
    "email": "aakarshpc@gmail.com",
    "phoneNo": "07982429451",
    "pref1": "Digital/Cinematography",
    "pref2": "Marketing/Outreach"
  },
  {
    "name": "Shantanu Yadav",
    "email": "23103095@mail.jiit.ac.in",
    "phoneNo": 9719588510,
    "pref1": "Digital/Cinematography",
    "pref2": "Creative"
  },
  {
    "name": "Priyanshu garg",
    "email": "priyanshugarg648@gmail.com",
    "phoneNo": 8595670296,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Gunjan Jain ",
    "email": "mgpsgunjan6166@gmail.com",
    "phoneNo": 7877367188,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Nishka Sharma",
    "email": "snishka51@gmail.com",
    "phoneNo": 9167056136,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Dishi Gautam ",
    "email": "mail2dishig@gmail.com",
    "phoneNo": 8130202217,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Abdul samad",
    "email": "abdulsa616@gmail.com",
    "phoneNo": 9354428236,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Harsh Mishra",
    "email": "harshmishra17042004@gmail.com",
    "phoneNo": 9752413164,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Purnendu Raghav Srivastava",
    "email": "purnenduraghavsrivastava@gmail.com",
    "phoneNo": 7905709958,
    "pref1": "Technical",
    "pref2": "Creative"
  },
  {
    phoneNo: "8595842343",
    email: "hello.first93@gmail.com",
    name: " Rajat ",
    pref1: "randi",
    pref2: "randi(utkarsh)"
  },
  {
    "name": "Riya Rah",
    "email": "Riya17872@gmail.con",
    "phoneNo": 9643116318,
    "pref1": "Technical",
    "pref2": "Marketing/Outreach"
  },
  {
    "name": "Kush Singh ",
    "email": "kushsingh2505@gmail.com",
    "phoneNo": 7572025407,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Md Nawaz Alam",
    "email": "jugnualam141@gmail.com",
    "phoneNo": 7091260761,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Kartik Agarwal ",
    "email": "kartik.agarwal.29012004@gmail.com",
    "phoneNo": 8700483798,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Balaji Katyan",
    "email": "balaji.katyan@gmail.com",
    "phoneNo": 8299184527,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Ayush Jaggi",
    "email": "Ayjaggi27@gmail.com",
    "phoneNo": 9044094579,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Saksham Kuksal",
    "email": "sakshamkuksal23@gmail.com",
    "phoneNo": 9650307568,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "SHIVANS SINGH",
    "email": "shivans.tech.ece@gmail.com",
    "phoneNo": 8727800948,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "Yash Yadav",
    "email": "yashyadavproductions@gmail.com",
    "phoneNo": 9599617052,
    "pref1": "Technical",
    "pref2": "Management"
  },
  {
    "name": "saniya parveen",
    "email": "9923102062@mail.jiit.ac.in",
    "phoneNo": 8860277860,
    "pref1": "Creative",
    "pref2": "Technical"
  },
  {
    "name": "Jatin Singh",
    "email": "sjatin352@gmail.com",
    "phoneNo": 9871423740,
    "pref1": "Management",
    "pref2": "Technical"
  },
  {
    "name": "Mitul Rana",
    "email": "mitulrana2005@gmail.com",
    "phoneNo": 9625795025,
    "pref1": "Management",
    "pref2": "Technical"
  },
  {
    "name": "Archit Jain",
    "email": "Archit.j.2005@gmail.com",
    "phoneNo": 9250667835,
    "pref1": "PR",
    "pref2": "Marketing/Outreach"
  },
  {
    "name": "Riya Chachra",
    "email": "23517039@mail.jiit.ac.in",
    "phoneNo": 9911501317,
    "pref1": "Management",
    "pref2": "PR"
  },
  {
    "name": "Nishita Jain",
    "email": "nishita72jain@gmail.com",
    "phoneNo": 9501846291,
    "pref1": "Management",
    "pref2": "PR"
  },
  {
    "name": "Reet",
    "email": "reets6526@gmail.com",
    "phoneNo": 9928797769,
    "pref1": "Management",
    "pref2": "Creative"
  },
  {
    "name": "Ishika Singh",
    "email": "ishikasingh242006@gmail.com",
    "phoneNo": 9205823342,
    "pref1": "Management",
    "pref2": "Creative"
  },
  {
    "name": "Naman Sood",
    "email": "namansood2005@gmail.com",
    "phoneNo": 9654447100,
    "pref1": "Management",
    "pref2": "Marketing/Outreach"
  },
  {
    "name": "Abhay Kumar yadav ",
    "email": "abhaykumaryadavallen1@gmail.com",
    "phoneNo": 9453636328,
    "pref1": "Management",
    "pref2": "Marketing/Outreach"
  },
  {
    "name": "Feba prince abraham",
    "email": "abrahamfeba22@gmail.com",
    "phoneNo": 9522680152,
    "pref1": "Management",
    "pref2": "Creative"
  },
  {
    "name": "Jaya Singh",
    "email": "jaya.singh291004@gmail.com",
    "phoneNo": 7250132999,
    "pref1": "Management",
    "pref2": "Creative"
  },
  {
    "name": "Ishita Agarwal",
    "email": "ishitaagarwal0210@gmail.com",
    "phoneNo": 8368296484,
    "pref1": "Management",
    "pref2": "Marketing/Outreach"
  },
  {
    "name": "Sneha Goel ",
    "email": "snehagoel547@gmail.com",
    "phoneNo": 7982085383,
    "pref1": "Management",
    "pref2": "Management"
  },
  {
    "name": "Dev Verma ",
    "email": "dev.v5574@gmail.com",
    "phoneNo": 9871916017,
    "pref1": "Management",
    "pref2": "Creative"
  },
  {
    "name": "Freya Prince Abraham ",
    "email": "freyaabraham87@gmail.com",
    "phoneNo": 7898425237,
    "pref1": "Creative",
    "pref2": "Management"
  },
  {
    "name": "Nayana Srivvastava",
    "email": "nayanasrivastava13@gmail.com",
    "phoneNo": 8130418685,
    "pref1": "Creative",
    "pref2": "Management"
  },
  {
    "name": "Taanishi Bhatnagar",
    "email": "bhatnagartaanishi@gmail.com",
    "phoneNo": 9810633397,
    "pref1": "Marketing/Outreach",
    "pref2": "Management"
  },
  {
    "name": "yagyasha rastogi",
    "email": "yagyasha.rastogi2805@gmail.com",
    "phoneNo": 9910574649,
    "pref1": "Creative",
    "pref2": "Marketing/Outreach"
  },
  {
    "name": "Dev Bhatia ",
    "email": "Netdev05id@gmail.com",
    "phoneNo": 7065410827,
    "pref1": "Management",
    "pref2": "Technical"

  },
  {
    phoneNo: 8570940287,
    email: "22103217@mail.jiit.ac.in",
    name: "Yash",
    pref1: "tech",
    pref2: "management"
  },




];

export default users;
