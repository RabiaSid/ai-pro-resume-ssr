import { getCurrentYear } from "./utils/dateUtils";

const FooterContent = () => {
  return (
    <footer className="footers">
      COPYRIGHT &copy; {getCurrentYear()} All rights reserved
    </footer>
  );
};

export default FooterContent;
