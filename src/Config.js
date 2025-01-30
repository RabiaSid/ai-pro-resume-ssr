import { createGlobalState } from "react-hooks-global-state";
global.baseurl = "https://backend.aiproresume.com/public/api";
global.imageUrl = "https://backend.aiproresume.com/public/images/";
//global.localPath = "https://wizardtechlabbs.com/demo/";
//global.baseurl = "https://airesume.mttraders.co/public/api";
//global.imageUrl = "https://airesume.mttraders.co/public/images/";
// global.localPath = "http://localhost:3000/";
global.localPath = "https://aiproresume.com/";
// global.localPath = "https://aiproresume.mttraders.co/demo/";

//global.captcha_sitekey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; //6LfubJMlAAAAAIS9rmGEc2X08qYGRnfUojI9nVXh testing

// global.captcha_sitekey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; //6LfubJMlAAAAAIS9rmGEc2X08qYGRnfUojI9nVXh testing

global.captcha_sitekey = "6LdRjxslAAAAAIP7BsNtsYgCvPM5RfNXjHGIzveJ";

//global.google_client_id =   "836834017476-9e99ra10kti08qdrgr3ptgj56c06qut1.apps.googleusercontent.com"; //old
global.google_client_id =
  "836834017476-9e99ra10kti08qdrgr3ptgj56c06qut1.apps.googleusercontent.com"; //old

// global.google_client_id =
//   "556331568353-j3sduejcad86gkah7pigm39ee99mec7i.apps.googleusercontent.com"; // for testing
// global.google_client_id =
//   "30407081049-l28nmbdb0sji0l78oud7kq3jd375lkri.apps.googleusercontent.com";
global.fb_app_id = "1613981572684330";
//global.fb_app_id = "964653934570277";
// //global.token = "111";http://resume.cognitiveitsolutions.ca/public/
// var tokenm='1'; http://emp.cognitiveitsolutions.ca/public/

global.getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const { setGlobalState, useGlobalState } = createGlobalState({
  token2: "0",
});
let chk = 0;
// function Config() {
//   return (
//     <div>

//     </div>
//   )
// }

export { chk, useGlobalState, setGlobalState };
