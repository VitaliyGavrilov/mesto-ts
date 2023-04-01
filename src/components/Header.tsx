import  {FC} from "react";

const Header: FC = () => {
  return (
    <header className="header">
      <img src='logo.svg' className="header__logo" alt="Логотип проекта Mesto" />
    </header>
  )
}
export default Header;