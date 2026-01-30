export default function NavBar({ username }) {
  return (
    <>
      <div className="navCont">
        <div className="leftLinks">
          <div id="logoImgCont">
            <img src="" alt="Logo Image" />
          </div>
          <div id="logoTextCont">CHATTING APP</div>
        </div>
        <div className="rightLinks">
          <div className="linksCont">
            <ul>
              <li id="logout">Logout</li>
              <li id="about">About</li>
              <li id="portfolio">Portfolio</li>
            </ul>
          </div>
          <div className="profileBtnCont">
            <h3>{username}</h3> {/*Profile icon can be use later */}
          </div>
        </div>
      </div>
    </>
  );
}
